from pydantic import BaseModel


class StockLevelCreate(BaseModel):
    product_id: int
    warehouse_id: int
    quantity: int = 0
    min_level: int = 0
    max_level: int = 0
    reorder_point: int = 0


class StockLevelUpdate(BaseModel):
    quantity: int | None = None
    min_level: int | None = None
    max_level: int | None = None
    reorder_point: int | None = None


class StockLevelOut(BaseModel):
    id: int
    product_id: int
    warehouse_id: int
    quantity: int
    min_level: int
    max_level: int
    reorder_point: int

    model_config = {"from_attributes": True}


class StockAlert(BaseModel):
    product_id: int
    product_name: str
    sku: str
    warehouse_id: int
    warehouse_name: str
    current_quantity: int
    min_level: int
    reorder_point: int
