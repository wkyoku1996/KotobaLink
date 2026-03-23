from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db_session
from app.modules.order.schemas import OrderListResponse
from app.modules.order.service import list_student_orders


router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=OrderListResponse)
def read_orders(session: Session = Depends(get_db_session)) -> OrderListResponse:
    return OrderListResponse(data=list_student_orders(session))
