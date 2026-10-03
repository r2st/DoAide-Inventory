from decimal import Decimal

from pydantic import BaseModel


class PurchaseItemCreate(BaseModel):
    product_id: int
    quantity: int
    unit_price: Decimal


class PurchaseItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: float
    received_quantity: int

    model_config = {"from_attributes": True}


class PurchaseOrderCreate(BaseModel):
    supplier_id: int
    warehouse_id: int
    notes: str | None = None
    items: list[PurchaseItemCreate]


class PurchaseOrderUpdate(BaseModel):
    status: str | None = None
    notes: str | None = None


class PurchaseOrderOut(BaseModel):
    id: int
    order_number: str
    supplier_id: int
    warehouse_id: int
    status: str
    notes: str | None
    total_amount: float
    items: list[PurchaseItemOut] = []

    model_config = {"from_attributes": True}


class ReceiveItemRequest(BaseModel):
    item_id: int
    quantity: int
