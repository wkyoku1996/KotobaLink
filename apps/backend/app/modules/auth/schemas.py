from pydantic import BaseModel

from app.common.schemas import ApiResponse


class LoginRequest(BaseModel):
    username: str
    password: str


class AuthUser(BaseModel):
    id: str
    username: str
    display_name: str
    role: str


class LoginData(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AuthUser


class LoginResponse(ApiResponse):
    data: LoginData


class MeResponse(ApiResponse):
    data: AuthUser


class LogoutResponse(ApiResponse):
    data: dict[str, str]
