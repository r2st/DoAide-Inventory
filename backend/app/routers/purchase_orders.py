from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.purchase_order import POStatus, PurchaseItem, PurchaseOrder
from app.models.stock_level import StockLevel
from app.models.user import User
from app.schemas.purchase_order import (
    PurchaseOrderCreate,
    PurchaseOrderOut,
    PurchaseOrderUpdate,
    ReceiveItemRequest,
)

router = APIRouter(prefix="/purchase-orders", tags=["purchase-orders"])


def _next_po_number(db: Session, business_id: int) -> str:
    count = db.query(PurchaseOrder).filter(PurchaseOrder.business_id == business_id).count()
    return f"PO-{count + 1:05d}"


@router.get("", response_model=list[PurchaseOrderOut])
def list_purchase_orders(
    status: str | None = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    q = db.query(PurchaseOrder).filter(PurchaseOrder.business_id == user.business_id)
    if status:
        q = q.filter(PurchaseOrder.status == status)
    return q.order_by(PurchaseOrder.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{order_id}", response_model=PurchaseOrderOut)
def get_purchase_order(order_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    po = db.query(PurchaseOrder).filter(
        PurchaseOrder.id == order_id, PurchaseOrder.business_id == user.business_id
    ).first()
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")
    return po


@router.post("", response_model=PurchaseOrderOut, status_code=201, dependencies=[Depends(require_staff)])
def create_purchase_order(body: PurchaseOrderCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    po = PurchaseOrder(
        business_id=user.business_id,
        order_number=_next_po_number(db, user.business_id),
        supplier_id=body.supplier_id,
        warehouse_id=body.warehouse_id,
        notes=body.notes,
    )
    total = 0
    for item in body.items:
        pi = PurchaseItem(
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=float(item.unit_price),
        )
        total += item.quantity * float(item.unit_price)
        po.items.append(pi)

    po.total_amount = total
    db.add(po)
    db.commit()
    db.refresh(po)
    return po


@router.patch("/{order_id}", response_model=PurchaseOrderOut, dependencies=[Depends(require_staff)])
def update_purchase_order(
    order_id: int, body: PurchaseOrderUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    po = db.query(PurchaseOrder).filter(
        PurchaseOrder.id == order_id, PurchaseOrder.business_id == user.business_id
    ).first()
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(po, field, value)
    db.commit()
    db.refresh(po)
    return po


@router.post("/{order_id}/receive", response_model=PurchaseOrderOut, dependencies=[Depends(require_staff)])
def receive_items(
    order_id: int,
    items: list[ReceiveItemRequest],
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    po = db.query(PurchaseOrder).filter(
        PurchaseOrder.id == order_id, PurchaseOrder.business_id == user.business_id
    ).first()
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")

    for recv in items:
        pi = db.query(PurchaseItem).filter(
            PurchaseItem.id == recv.item_id, PurchaseItem.order_id == po.id
        ).first()
        if not pi:
            raise HTTPException(status_code=404, detail=f"Item {recv.item_id} not found")
        pi.received_quantity += recv.quantity

        sl = db.query(StockLevel).filter(
            StockLevel.product_id == pi.product_id,
            StockLevel.warehouse_id == po.warehouse_id,
            StockLevel.business_id == user.business_id,
        ).first()
        if sl:
            sl.quantity += recv.quantity
        else:
            sl = StockLevel(
                business_id=user.business_id,
                product_id=pi.product_id,
                warehouse_id=po.warehouse_id,
                quantity=recv.quantity,
            )
            db.add(sl)

    all_received = all(pi.received_quantity >= pi.quantity for pi in po.items)
    any_received = any(pi.received_quantity > 0 for pi in po.items)
    if all_received:
        po.status = POStatus.RECEIVED
    elif any_received:
        po.status = POStatus.PARTIAL

    db.commit()
    db.refresh(po)
    return po
