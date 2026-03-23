from fastapi import HTTPException, status

from app.modules.auth.schemas import AuthUser, LoginData, LoginRequest


DEMO_ACCOUNTS = {
    "admin": {
        "password": "kotobalink123",
        "token": "demo-admin-token",
        "user": AuthUser(
            id="admin-001",
            username="admin",
            display_name="KotobaLink Admin",
            role="super_admin",
        ),
    },
    "ops_admin": {
        "password": "ops123",
        "token": "demo-ops-admin-token",
        "user": AuthUser(
            id="ops-admin-001",
            username="ops_admin",
            display_name="运营 / 教务账号",
            role="ops_admin",
        ),
    },
    "teacher": {
        "password": "teacher123",
        "token": "demo-teacher-token",
        "user": AuthUser(
            id="teacher-001",
            username="teacher",
            display_name="教师账号",
            role="teacher",
        ),
    },
}


def login(credentials: LoginRequest) -> LoginData:
    account = DEMO_ACCOUNTS.get(credentials.username)
    if account is None or credentials.password != account["password"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return LoginData(access_token=account["token"], user=account["user"])


def get_current_user_from_token(token: str) -> AuthUser:
    for account in DEMO_ACCOUNTS.values():
        if token == account["token"]:
            return account["user"]

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
    )
