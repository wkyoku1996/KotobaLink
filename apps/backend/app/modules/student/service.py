from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.db.init_data import DEMO_STUDENT_ID
from app.db.models import Enrollment, Student
from app.modules.student.schemas import StudentCourseItem, StudentProfile


def get_current_student_profile(session: Session) -> StudentProfile:
    student = session.get(Student, DEMO_STUDENT_ID)
    if student is None:
        raise LookupError("Demo student not found")

    current_enrollment = session.execute(
        select(Enrollment)
        .options(joinedload(Enrollment.course))
        .where(Enrollment.student_id == student.id)
        .order_by(Enrollment.created_at.desc())
    ).scalar_one_or_none()

    return StudentProfile(
        id=student.id,
        name=student.name,
        level=student.level,
        current_course=current_enrollment.course.name if current_enrollment else "",
        membership_status=student.membership_status,
    )


def list_current_student_courses(session: Session) -> list[StudentCourseItem]:
    enrollments = session.execute(
        select(Enrollment)
        .options(joinedload(Enrollment.course))
        .where(Enrollment.student_id == DEMO_STUDENT_ID)
        .order_by(Enrollment.created_at.desc())
    ).scalars().all()

    return [
        StudentCourseItem(
            id=enrollment.id,
            course_id=enrollment.course_id,
            course_name=enrollment.course.name,
            class_name=enrollment.class_name,
            teacher=enrollment.teacher,
            classroom=enrollment.classroom,
            service_status=enrollment.service_status,
            lesson_progress=enrollment.lesson_progress,
        )
        for enrollment in enrollments
    ]
