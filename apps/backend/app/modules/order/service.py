from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.init_data import DEMO_STUDENT_ID
from app.db.models import Order
from app.modules.order.schemas import OrderItem


def list_student_orders(session: Session) -> list[OrderItem]:
    orders = session.execute(
        select(Order).where(Order.student_id == DEMO_STUDENT_ID).order_by(Order.created_at.desc())
    ).scalars().all()
    return [
        OrderItem(
            id=order.id,
            business_type=order.business_type,
            target_name=order.target_name,
            payment_status=order.payment_status,
            amount=order.price,
        )
        for order in orders
    ]
