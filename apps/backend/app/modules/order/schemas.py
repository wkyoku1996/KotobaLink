from pydantic import BaseModel

from app.common.schemas import ApiResponse


class OrderItem(BaseModel):
    id: str
    business_type: str
    target_name: str
    payment_status: str
    amount: int


class OrderListResponse(ApiResponse):
    data: list[OrderItem]
