from decimal import Decimal

from pydantic import BaseModel


class SaleItemCreate(BaseModel):
    product_id: int
    quantity: int
    unit_price: Decimal


class SaleItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: float
    shipped_quantity: int

    model_config = {"from_attributes": True}


class SalesOrderCreate(BaseModel):
    customer_id: int
    warehouse_id: int
    notes: str | None = None
    items: list[SaleItemCreate]


class SalesOrderUpdate(BaseModel):
    status: str | None = None
    notes: str | None = None


class SalesOrderOut(BaseModel):
    id: int
    order_number: str
    customer_id: int
    warehouse_id: int
    status: str
    notes: str | None
    total_amount: float
    items: list[SaleItemOut] = []

    model_config = {"from_attributes": True}
