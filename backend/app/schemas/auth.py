from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None
    business_name: str
    gstin: str | None = None


class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: str
    full_name: str | None
    phone: str | None
    role: str
    is_active: bool

    model_config = {"from_attributes": True}


class BusinessOut(BaseModel):
    id: int
    name: str
    gstin: str | None
    address: str | None
    phone: str | None
    email: str | None
    plan: str
    is_active: bool

    model_config = {"from_attributes": True}


class RegisterResponse(BaseModel):
    user: UserOut
    business: BusinessOut
    access_token: str
    token_type: str = "bearer"


class MeOut(UserOut):
    business: BusinessOut
