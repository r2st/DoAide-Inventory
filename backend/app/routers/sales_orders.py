from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.sales_order import SaleItem, SalesOrder, SOStatus
from app.models.stock_level import StockLevel
from app.models.user import User
from app.schemas.sales_order import SalesOrderCreate, SalesOrderOut, SalesOrderUpdate

router = APIRouter(prefix="/sales-orders", tags=["sales-orders"])


def _next_so_number(db: Session, business_id: int) -> str:
    count = db.query(SalesOrder).filter(SalesOrder.business_id == business_id).count()
    return f"SO-{count + 1:05d}"


@router.get("", response_model=list[SalesOrderOut])
def list_sales_orders(
    status: str | None = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    q = db.query(SalesOrder).filter(SalesOrder.business_id == user.business_id)
    if status:
        q = q.filter(SalesOrder.status == status)
    return q.order_by(SalesOrder.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{order_id}", response_model=SalesOrderOut)
def get_sales_order(order_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    so = db.query(SalesOrder).filter(
        SalesOrder.id == order_id, SalesOrder.business_id == user.business_id
    ).first()
    if not so:
        raise HTTPException(status_code=404, detail="Sales order not found")
    return so


@router.post("", response_model=SalesOrderOut, status_code=201, dependencies=[Depends(require_staff)])
def create_sales_order(body: SalesOrderCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    so = SalesOrder(
        business_id=user.business_id,
        order_number=_next_so_number(db, user.business_id),
        customer_id=body.customer_id,
        warehouse_id=body.warehouse_id,
        notes=body.notes,
    )
    total = 0
    for item in body.items:
        si = SaleItem(
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=float(item.unit_price),
        )
        total += item.quantity * float(item.unit_price)
        so.items.append(si)

    so.total_amount = total
    db.add(so)
    db.commit()
    db.refresh(so)
    return so


@router.patch("/{order_id}", response_model=SalesOrderOut, dependencies=[Depends(require_staff)])
def update_sales_order(
    order_id: int, body: SalesOrderUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    so = db.query(SalesOrder).filter(
        SalesOrder.id == order_id, SalesOrder.business_id == user.business_id
    ).first()
    if not so:
        raise HTTPException(status_code=404, detail="Sales order not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(so, field, value)
    db.commit()
    db.refresh(so)
    return so


@router.post("/{order_id}/ship", response_model=SalesOrderOut, dependencies=[Depends(require_staff)])
def ship_items(
    order_id: int,
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    so = db.query(SalesOrder).filter(
        SalesOrder.id == order_id, SalesOrder.business_id == user.business_id
    ).first()
    if not so:
        raise HTTPException(status_code=404, detail="Sales order not found")
    if so.status == SOStatus.CANCELLED:
        raise HTTPException(status_code=400, detail="Cannot ship a cancelled order")

    for si in so.items:
        remaining = si.quantity - si.shipped_quantity
        if remaining <= 0:
            continue
        sl = db.query(StockLevel).filter(
            StockLevel.product_id == si.product_id,
            StockLevel.warehouse_id == so.warehouse_id,
            StockLevel.business_id == user.business_id,
        ).first()
        if sl:
            sl.quantity = max(0, sl.quantity - remaining)
        si.shipped_quantity = si.quantity

    all_shipped = all(si.shipped_quantity >= si.quantity for si in so.items)
    so.status = SOStatus.SHIPPED if all_shipped else SOStatus.PARTIAL
    db.commit()
    db.refresh(so)
    return so
