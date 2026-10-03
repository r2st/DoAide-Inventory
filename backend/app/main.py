from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.errors import register_exception_handlers
from app.routers import (
    auth,
    barcode,
    categories,
    customers,
    health,
    products,
    purchase_orders,
    reports,
    sales_orders,
    stock,
    stock_adjustments,
    suppliers,
    warehouses,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings.startup_report()
    yield


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(app)

    app.include_router(health.router)
    app.include_router(auth.router)
    app.include_router(products.router)
    app.include_router(categories.router)
    app.include_router(warehouses.router)
    app.include_router(stock.router)
    app.include_router(suppliers.router)
    app.include_router(customers.router)
    app.include_router(purchase_orders.router)
    app.include_router(sales_orders.router)
    app.include_router(stock_adjustments.router)
    app.include_router(reports.router)
    app.include_router(barcode.router)

    return app


app = create_app()
