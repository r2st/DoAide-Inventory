from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_manager
from app.models.user import User
from app.models.warehouse import Warehouse
from app.schemas.warehouse import WarehouseCreate, WarehouseOut, WarehouseUpdate

router = APIRouter(prefix="/warehouses", tags=["warehouses"])


@router.get("", response_model=list[WarehouseOut])
def list_warehouses(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    return (
        db.query(Warehouse)
        .filter(Warehouse.business_id == user.business_id, Warehouse.deleted_at.is_(None))
        .order_by(Warehouse.name)
        .all()
    )


@router.post("", response_model=WarehouseOut, status_code=201, dependencies=[Depends(require_manager)])
def create_warehouse(body: WarehouseCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    wh = Warehouse(business_id=user.business_id, **body.model_dump())
    db.add(wh)
    db.commit()
    db.refresh(wh)
    return wh


@router.patch("/{warehouse_id}", response_model=WarehouseOut, dependencies=[Depends(require_manager)])
def update_warehouse(
    warehouse_id: int, body: WarehouseUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    wh = db.query(Warehouse).filter(
        Warehouse.id == warehouse_id, Warehouse.business_id == user.business_id, Warehouse.deleted_at.is_(None)
    ).first()
    if not wh:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(wh, field, value)
    db.commit()
    db.refresh(wh)
    return wh


@router.delete("/{warehouse_id}", status_code=204, dependencies=[Depends(require_manager)])
def delete_warehouse(
    warehouse_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    wh = db.query(Warehouse).filter(
        Warehouse.id == warehouse_id, Warehouse.business_id == user.business_id, Warehouse.deleted_at.is_(None)
    ).first()
    if not wh:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    wh.soft_delete()
    db.commit()
