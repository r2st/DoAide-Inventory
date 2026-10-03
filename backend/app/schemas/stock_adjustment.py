from pydantic import BaseModel


class StockAdjustmentCreate(BaseModel):
    product_id: int
    warehouse_id: int
    adjustment_type: str
    quantity: int
    reason: str | None = None


class StockAdjustmentOut(BaseModel):
    id: int
    product_id: int
    warehouse_id: int
    adjustment_type: str
    quantity: int
    reason: str | None
    adjusted_by: int | None

    model_config = {"from_attributes": True}
