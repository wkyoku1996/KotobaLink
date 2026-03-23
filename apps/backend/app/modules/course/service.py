from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models import Course
from app.modules.course.schemas import CourseItem


def list_catalog_courses(session: Session) -> list[CourseItem]:
    courses = session.execute(select(Course).order_by(Course.created_at.asc())).scalars().all()
    return [
        CourseItem(
            id=course.id,
            name=course.name,
            teacher=course.teacher,
            status=course.status,
            price=course.price,
        )
        for course in courses
    ]
