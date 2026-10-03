from decimal import Decimal

from pydantic import BaseModel


class ProductCreate(BaseModel):
    sku: str
    name: str
    description: str | None = None
    hsn_code: str | None = None
    category_id: int | None = None
    unit: str = "PCS"
    purchase_price: Decimal | None = None
    selling_price: Decimal | None = None
    tax_rate: Decimal | None = None
    barcode: str | None = None
    image_url: str | None = None


class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    hsn_code: str | None = None
    category_id: int | None = None
    unit: str | None = None
    purchase_price: Decimal | None = None
    selling_price: Decimal | None = None
    tax_rate: Decimal | None = None
    barcode: str | None = None
    image_url: str | None = None
    is_active: bool | None = None


class ProductOut(BaseModel):
    id: int
    sku: str
    name: str
    description: str | None
    hsn_code: str | None
    category_id: int | None
    unit: str
    purchase_price: float | None
    selling_price: float | None
    tax_rate: float | None
    barcode: str | None
    image_url: str | None
    is_active: bool

    model_config = {"from_attributes": True}
