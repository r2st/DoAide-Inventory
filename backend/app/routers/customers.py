from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.customer import Customer
from app.models.user import User
from app.schemas.customer import CustomerCreate, CustomerOut, CustomerUpdate

router = APIRouter(prefix="/customers", tags=["customers"])


@router.get("", response_model=list[CustomerOut])
def list_customers(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    return (
        db.query(Customer)
        .filter(Customer.business_id == user.business_id, Customer.deleted_at.is_(None))
        .order_by(Customer.name)
        .all()
    )


@router.post("", response_model=CustomerOut, status_code=201, dependencies=[Depends(require_staff)])
def create_customer(body: CustomerCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    c = Customer(business_id=user.business_id, **body.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@router.patch("/{customer_id}", response_model=CustomerOut, dependencies=[Depends(require_staff)])
def update_customer(
    customer_id: int, body: CustomerUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    c = db.query(Customer).filter(
        Customer.id == customer_id, Customer.business_id == user.business_id, Customer.deleted_at.is_(None)
    ).first()
    if not c:
        raise HTTPException(status_code=404, detail="Customer not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(c, field, value)
    db.commit()
    db.refresh(c)
    return c


@router.delete("/{customer_id}", status_code=204, dependencies=[Depends(require_staff)])
def delete_customer(customer_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    c = db.query(Customer).filter(
        Customer.id == customer_id, Customer.business_id == user.business_id, Customer.deleted_at.is_(None)
    ).first()
    if not c:
        raise HTTPException(status_code=404, detail="Customer not found")
    c.soft_delete()
    db.commit()
