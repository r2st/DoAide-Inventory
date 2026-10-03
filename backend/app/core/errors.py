from __future__ import annotations

import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(Exception)
    async def unhandled_exception(request: Request, exc: Exception) -> JSONResponse:
        correlation_id = getattr(request.state, "correlation_id", None)
        logger.exception("Unhandled exception", extra={"correlation_id": correlation_id})
        return JSONResponse(
            status_code=500,
            content={
                "detail": "An unexpected error occurred.",
                "error": {"code": "internal_error", "status": 500},
            },
        )
