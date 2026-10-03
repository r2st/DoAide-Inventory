from __future__ import annotations

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.business import Business
from app.models.user import User, UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

_credentials_exc = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

_RANK: dict[UserRole, int] = {
    UserRole.VIEWER: 0,
    UserRole.STAFF: 1,
    UserRole.MANAGER: 2,
    UserRole.OWNER: 3,
}


def get_current_user(
    request: Request, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> User:
    subject = decode_access_token(token)
    if subject is None:
        raise _credentials_exc
    try:
        user_id = int(subject)
    except (TypeError, ValueError) as exc:
        raise _credentials_exc from exc
    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise _credentials_exc
    request.state.user_id = user.id
    return user


def get_current_business(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> User:
    business = db.get(Business, current_user.business_id)
    if business is None or not business.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This business has been deactivated.",
        )
    return current_user


class RequireRole:
    def __init__(self, minimum: UserRole) -> None:
        self.minimum = minimum

    def __call__(self, current_user: User = Depends(get_current_user)) -> User:
        if _RANK[current_user.role] < _RANK[self.minimum]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient permissions. Role '{current_user.role.value}' cannot perform this action.",
            )
        return current_user


require_manager = RequireRole(UserRole.MANAGER)
require_staff = RequireRole(UserRole.STAFF)
