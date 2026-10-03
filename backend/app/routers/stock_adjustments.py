from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.stock_adjustment import AdjustmentType, StockAdjustment
from app.models.stock_level import StockLevel
from app.models.user import User
from app.schemas.stock_adjustment import StockAdjustmentCreate, StockAdjustmentOut

router = APIRouter(prefix="/stock-adjustments", tags=["stock-adjustments"])


@router.get("", response_model=list[StockAdjustmentOut])
def list_adjustments(
    product_id: int | None = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    q = db.query(StockAdjustment).filter(StockAdjustment.business_id == user.business_id)
    if product_id:
        q = q.filter(StockAdjustment.product_id == product_id)
    return q.order_by(StockAdjustment.created_at.desc()).offset(skip).limit(limit).all()


@router.post("", response_model=StockAdjustmentOut, status_code=201, dependencies=[Depends(require_staff)])
def create_adjustment(
    body: StockAdjustmentCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    adj = StockAdjustment(
        business_id=user.business_id,
        product_id=body.product_id,
        warehouse_id=body.warehouse_id,
        adjustment_type=AdjustmentType(body.adjustment_type),
        quantity=body.quantity,
        reason=body.reason,
        adjusted_by=user.id,
    )
    db.add(adj)

    sl = db.query(StockLevel).filter(
        StockLevel.product_id == body.product_id,
        StockLevel.warehouse_id == body.warehouse_id,
        StockLevel.business_id == user.business_id,
    ).first()
    if sl:
        sl.quantity += body.quantity
        if sl.quantity < 0:
            sl.quantity = 0
    else:
        sl = StockLevel(
            business_id=user.business_id,
            product_id=body.product_id,
            warehouse_id=body.warehouse_id,
            quantity=max(0, body.quantity),
        )
        db.add(sl)

    db.commit()
    db.refresh(adj)
    return adj
