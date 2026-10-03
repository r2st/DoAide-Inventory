from pydantic import BaseModel


class WarehouseCreate(BaseModel):
    name: str
    address: str | None = None
    city: str | None = None
    state: str | None = None
    pincode: str | None = None
    is_default: bool = False


class WarehouseUpdate(BaseModel):
    name: str | None = None
    address: str | None = None
    city: str | None = None
    state: str | None = None
    pincode: str | None = None
    is_default: bool | None = None


class WarehouseOut(BaseModel):
    id: int
    name: str
    address: str | None
    city: str | None
    state: str | None
    pincode: str | None
    is_default: bool

    model_config = {"from_attributes": True}
