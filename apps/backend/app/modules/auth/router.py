from fastapi import APIRouter, Header

from app.modules.auth.schemas import LoginRequest, LoginResponse, LogoutResponse, MeResponse
from app.modules.auth.service import get_current_user_from_token, login


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login_admin(payload: LoginRequest) -> LoginResponse:
    return LoginResponse(data=login(payload))


@router.get("/me", response_model=MeResponse)
def read_me(authorization: str = Header(default="")) -> MeResponse:
    token = authorization.removeprefix("Bearer ").strip()
    return MeResponse(data=get_current_user_from_token(token))


@router.post("/logout", response_model=LogoutResponse)
def logout_admin() -> LogoutResponse:
    return LogoutResponse(data={"message": "logged_out"})
