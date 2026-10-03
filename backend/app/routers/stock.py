from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.product import Product
from app.models.stock_level import StockLevel
from app.models.user import User
from app.models.warehouse import Warehouse
from app.schemas.stock import StockAlert, StockLevelCreate, StockLevelOut, StockLevelUpdate

router = APIRouter(prefix="/stock", tags=["stock"])


@router.get("", response_model=list[StockLevelOut])
def list_stock(
    warehouse_id: int | None = None,
    product_id: int | None = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    q = db.query(StockLevel).filter(StockLevel.business_id == user.business_id)
    if warehouse_id:
        q = q.filter(StockLevel.warehouse_id == warehouse_id)
    if product_id:
        q = q.filter(StockLevel.product_id == product_id)
    return q.offset(skip).limit(limit).all()


@router.post("", response_model=StockLevelOut, status_code=201, dependencies=[Depends(require_staff)])
def create_stock_level(body: StockLevelCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    existing = db.query(StockLevel).filter(
        StockLevel.product_id == body.product_id,
        StockLevel.warehouse_id == body.warehouse_id,
        StockLevel.business_id == user.business_id,
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Stock level already exists for this product/warehouse")

    sl = StockLevel(business_id=user.business_id, **body.model_dump())
    db.add(sl)
    db.commit()
    db.refresh(sl)
    return sl


@router.patch("/{stock_id}", response_model=StockLevelOut, dependencies=[Depends(require_staff)])
def update_stock_level(
    stock_id: int, body: StockLevelUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    sl = db.query(StockLevel).filter(
        StockLevel.id == stock_id, StockLevel.business_id == user.business_id
    ).first()
    if not sl:
        raise HTTPException(status_code=404, detail="Stock level not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(sl, field, value)
    db.commit()
    db.refresh(sl)
    return sl


@router.get("/alerts", response_model=list[StockAlert])
def stock_alerts(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    rows = (
        db.query(StockLevel, Product, Warehouse)
        .join(Product, StockLevel.product_id == Product.id)
        .join(Warehouse, StockLevel.warehouse_id == Warehouse.id)
        .filter(
            StockLevel.business_id == user.business_id,
            StockLevel.quantity <= StockLevel.reorder_point,
            Product.deleted_at.is_(None),
        )
        .all()
    )
    return [
        StockAlert(
            product_id=sl.product_id,
            product_name=p.name,
            sku=p.sku,
            warehouse_id=sl.warehouse_id,
            warehouse_name=w.name,
            current_quantity=sl.quantity,
            min_level=sl.min_level,
            reorder_point=sl.reorder_point,
        )
        for sl, p, w in rows
    ]
