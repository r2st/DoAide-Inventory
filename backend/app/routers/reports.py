from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business
from app.models.product import Product
from app.models.purchase_order import PurchaseOrder
from app.models.sales_order import SalesOrder
from app.models.stock_adjustment import StockAdjustment
from app.models.stock_level import StockLevel
from app.models.user import User

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/stock-value")
def stock_value_report(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    rows = (
        db.query(
            Product.id,
            Product.sku,
            Product.name,
            func.coalesce(func.sum(StockLevel.quantity), 0).label("total_qty"),
            Product.purchase_price,
            Product.selling_price,
        )
        .outerjoin(StockLevel, StockLevel.product_id == Product.id)
        .filter(Product.business_id == user.business_id, Product.deleted_at.is_(None))
        .group_by(Product.id)
        .all()
    )
    items = []
    total_cost = 0
    total_retail = 0
    for r in rows:
        cost_val = (r.total_qty * float(r.purchase_price or 0))
        retail_val = (r.total_qty * float(r.selling_price or 0))
        total_cost += cost_val
        total_retail += retail_val
        items.append({
            "product_id": r.id,
            "sku": r.sku,
            "name": r.name,
            "quantity": r.total_qty,
            "cost_value": round(cost_val, 2),
            "retail_value": round(retail_val, 2),
        })
    return {"items": items, "total_cost_value": round(total_cost, 2), "total_retail_value": round(total_retail, 2)}


@router.get("/stock-movement")
def stock_movement_report(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    adjustments = (
        db.query(
            StockAdjustment.product_id,
            StockAdjustment.adjustment_type,
            func.sum(StockAdjustment.quantity).label("total"),
        )
        .filter(StockAdjustment.business_id == user.business_id)
        .group_by(StockAdjustment.product_id, StockAdjustment.adjustment_type)
        .all()
    )
    result = {}
    for a in adjustments:
        pid = a.product_id
        if pid not in result:
            result[pid] = {"product_id": pid, "movements": {}}
        result[pid]["movements"][a.adjustment_type.value if hasattr(a.adjustment_type, 'value') else a.adjustment_type] = a.total
    return {"items": list(result.values())}


@router.get("/dashboard")
def dashboard(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    biz = user.business_id
    total_products = db.query(func.count(Product.id)).filter(
        Product.business_id == biz, Product.deleted_at.is_(None)
    ).scalar()
    low_stock = db.query(func.count(StockLevel.id)).filter(
        StockLevel.business_id == biz, StockLevel.quantity <= StockLevel.reorder_point
    ).scalar()
    total_po = db.query(func.count(PurchaseOrder.id)).filter(PurchaseOrder.business_id == biz).scalar()
    total_so = db.query(func.count(SalesOrder.id)).filter(SalesOrder.business_id == biz).scalar()
    return {
        "total_products": total_products or 0,
        "low_stock_count": low_stock or 0,
        "total_purchase_orders": total_po or 0,
        "total_sales_orders": total_so or 0,
    }
