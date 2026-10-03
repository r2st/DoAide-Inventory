from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business, require_staff
from app.models.category import Category
from app.models.user import User
from app.schemas.category import CategoryCreate, CategoryOut, CategoryUpdate

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryOut])
def list_categories(user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    return (
        db.query(Category)
        .filter(Category.business_id == user.business_id, Category.deleted_at.is_(None))
        .order_by(Category.name)
        .all()
    )


@router.post("", response_model=CategoryOut, status_code=201, dependencies=[Depends(require_staff)])
def create_category(body: CategoryCreate, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    cat = Category(business_id=user.business_id, **body.model_dump())
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat


@router.patch("/{category_id}", response_model=CategoryOut, dependencies=[Depends(require_staff)])
def update_category(
    category_id: int, body: CategoryUpdate, user: User = Depends(get_current_business), db: Session = Depends(get_db)
):
    cat = db.query(Category).filter(
        Category.id == category_id, Category.business_id == user.business_id, Category.deleted_at.is_(None)
    ).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(cat, field, value)
    db.commit()
    db.refresh(cat)
    return cat


@router.delete("/{category_id}", status_code=204, dependencies=[Depends(require_staff)])
def delete_category(category_id: int, user: User = Depends(get_current_business), db: Session = Depends(get_db)):
    cat = db.query(Category).filter(
        Category.id == category_id, Category.business_id == user.business_id, Category.deleted_at.is_(None)
    ).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    cat.soft_delete()
    db.commit()
