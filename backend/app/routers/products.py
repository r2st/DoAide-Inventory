from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductOut])
def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    search: str | None = None,
    category_id: int | None = None,
    active_only: bool = True,
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    q = db.query(Product).filter(
        Product.business_id == user.business_id,
        Product.deleted_at.is_(None),
    )
    if active_only:
        q = q.filter(Product.is_active.is_(True))
    if search:
        q = q.filter(Product.name.ilike(f"%{search}%") | Product.sku.ilike(f"%{search}%"))
    if category_id:
        q = q.filter(Product.category_id == category_id)
    return q.order_by(Product.name).offset(skip).limit(limit).all()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    p = db.query(Product).filter(
        Product.id == product_id, Product.business_id == user.business_id, Product.deleted_at.is_(None)
    ).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p


@router.post("", response_model=ProductOut, status_code=201, dependencies=[Depends(require_staff)])
def create_product(body: ProductCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    existing = db.query(Product).filter(
        Product.business_id == user.business_id, Product.sku == body.sku, Product.deleted_at.is_(None)
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="SKU already exists")

    product = Product(business_id=user.business_id, **body.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.patch("/{product_id}", response_model=ProductOut, dependencies=[Depends(require_staff)])
def update_product(
    product_id: int, body: ProductUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    p = db.query(Product).filter(
        Product.id == product_id, Product.business_id == user.business_id, Product.deleted_at.is_(None)
    ).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")

    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(p, field, value)
    db.commit()
    db.refresh(p)
    return p


@router.delete("/{product_id}", status_code=204, dependencies=[Depends(require_staff)])
def delete_product(product_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    p = db.query(Product).filter(
        Product.id == product_id, Product.business_id == user.business_id, Product.deleted_at.is_(None)
    ).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    p.soft_delete()
    db.commit()
