from fastapi import APIRouter

from app.core.database import check_database

router = APIRouter(tags=["health"])


@router.get("/health")
def health():
    db_ok = check_database()
    return {
        "status": "healthy" if db_ok else "degraded",
        "database": "connected" if db_ok else "disconnected",
    }
