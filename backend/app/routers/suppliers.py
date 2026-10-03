from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.supplier import Supplier
from app.models.user import User
from app.schemas.supplier import SupplierCreate, SupplierOut, SupplierUpdate

router = APIRouter(prefix="/suppliers", tags=["suppliers"])


@router.get("", response_model=list[SupplierOut])
def list_suppliers(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    return (
        db.query(Supplier)
        .filter(Supplier.business_id == user.business_id, Supplier.deleted_at.is_(None))
        .order_by(Supplier.name)
        .all()
    )


@router.post("", response_model=SupplierOut, status_code=201, dependencies=[Depends(require_staff)])
def create_supplier(body: SupplierCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    s = Supplier(business_id=user.business_id, **body.model_dump())
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


@router.patch("/{supplier_id}", response_model=SupplierOut, dependencies=[Depends(require_staff)])
def update_supplier(
    supplier_id: int, body: SupplierUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    s = db.query(Supplier).filter(
        Supplier.id == supplier_id, Supplier.business_id == user.business_id, Supplier.deleted_at.is_(None)
    ).first()
    if not s:
        raise HTTPException(status_code=404, detail="Supplier not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(s, field, value)
    db.commit()
    db.refresh(s)
    return s


@router.delete("/{supplier_id}", status_code=204, dependencies=[Depends(require_staff)])
def delete_supplier(supplier_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    s = db.query(Supplier).filter(
        Supplier.id == supplier_id, Supplier.business_id == user.business_id, Supplier.deleted_at.is_(None)
    ).first()
    if not s:
        raise HTTPException(status_code=404, detail="Supplier not found")
    s.soft_delete()
    db.commit()
