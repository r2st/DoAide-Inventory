from __future__ import annotations

from sqlalchemy import String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import BusinessScopedMixin, SoftDeleteMixin, TimestampMixin


class Warehouse(Base, TimestampMixin, SoftDeleteMixin, BusinessScopedMixin):
    __tablename__ = "warehouses"
    __table_args__ = (
        UniqueConstraint("business_id", "name", name="uq_warehouse_business_name"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str | None] = mapped_column(String(500), nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    pincode: Mapped[str | None] = mapped_column(String(10), nullable=True)
    is_default: Mapped[bool] = mapped_column(default=False, nullable=False)

    stock_levels: Mapped[list] = relationship("StockLevel", back_populates="warehouse")
