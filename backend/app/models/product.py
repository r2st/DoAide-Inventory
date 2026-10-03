from __future__ import annotations

from sqlalchemy import ForeignKey, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import BusinessScopedMixin, Money, SoftDeleteMixin, TimestampMixin


class Product(Base, TimestampMixin, SoftDeleteMixin, BusinessScopedMixin):
    __tablename__ = "products"
    __table_args__ = (
        UniqueConstraint("business_id", "sku", name="uq_product_business_sku"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    sku: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    hsn_code: Mapped[str | None] = mapped_column(String(20), nullable=True)
    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("categories.id", ondelete="SET NULL"), nullable=True
    )
    unit: Mapped[str] = mapped_column(String(20), default="PCS", nullable=False)
    purchase_price: Mapped[float | None] = mapped_column(Money, nullable=True)
    selling_price: Mapped[float | None] = mapped_column(Money, nullable=True)
    tax_rate: Mapped[float | None] = mapped_column(Money, nullable=True)
    barcode: Mapped[str | None] = mapped_column(String(100), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)

    category: Mapped["Category"] = relationship(back_populates="products")
    stock_levels: Mapped[list] = relationship("StockLevel", back_populates="product")
