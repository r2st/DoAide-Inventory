from pydantic import BaseModel


class SupplierCreate(BaseModel):
    name: str
    contact_person: str | None = None
    email: str | None = None
    phone: str | None = None
    gstin: str | None = None
    address: str | None = None
    city: str | None = None
    state: str | None = None
    pincode: str | None = None


class SupplierUpdate(BaseModel):
    name: str | None = None
    contact_person: str | None = None
    email: str | None = None
    phone: str | None = None
    gstin: str | None = None
    address: str | None = None
    city: str | None = None
    state: str | None = None
    pincode: str | None = None


class SupplierOut(BaseModel):
    id: int
    name: str
    contact_person: str | None
    email: str | None
    phone: str | None
    gstin: str | None
    address: str | None
    city: str | None
    state: str | None
    pincode: str | None

    model_config = {"from_attributes": True}
