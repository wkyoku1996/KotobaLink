from pydantic import BaseModel

from app.common.schemas import ApiResponse


class StudentProfile(BaseModel):
    id: str
    name: str
    level: str
    current_course: str
    membership_status: str


class StudentProfileResponse(ApiResponse):
    data: StudentProfile


class StudentCourseItem(BaseModel):
    id: str
    course_id: str
    course_name: str
    class_name: str | None
    teacher: str | None
    classroom: str | None
    service_status: str
    lesson_progress: int


class StudentCourseListResponse(ApiResponse):
    data: list[StudentCourseItem]
