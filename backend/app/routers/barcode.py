import io
from base64 import b64encode

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_business
from app.models.product import Product
from app.models.user import User

router = APIRouter(prefix="/barcode", tags=["barcode"])


def _generate_barcode(data: str) -> str:
    import barcode
    from barcode.writer import SVGWriter

    code128 = barcode.get_barcode_class("code128")
    bc = code128(data, writer=SVGWriter())
    buf = io.BytesIO()
    bc.write(buf)
    return b64encode(buf.getvalue()).decode()


def _generate_qr(data: str) -> str:
    import qrcode

    img = qrcode.make(data)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return b64encode(buf.getvalue()).decode()


@router.get("/{product_id}")
def get_barcode(
    product_id: int,
    format: str = Query("barcode", pattern="^(barcode|qr)$"),
    user: User = Depends(get_current_business),
    db: Session = Depends(get_db),
):
    p = db.query(Product).filter(
        Product.id == product_id, Product.business_id == user.business_id, Product.deleted_at.is_(None)
    ).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")

    data = p.barcode or p.sku
    if format == "qr":
        encoded = _generate_qr(data)
        media_type = "image/png"
    else:
        encoded = _generate_barcode(data)
        media_type = "image/svg+xml"

    return {"data": encoded, "media_type": media_type, "value": data}
