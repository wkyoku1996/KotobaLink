from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db_session
from app.modules.miniapp.schemas import (
    MiniAssessmentDetailResponse,
    MiniCourseDetailResponse,
    MiniLessonDetailResponse,
    MiniCourseListResponse,
    MiniMyCourseDetailResponse,
    MiniMyCourseListResponse,
)
from app.modules.miniapp.service import (
    get_live_assessment_detail,
    get_live_course_detail,
    get_live_lesson_detail,
    get_my_live_course_detail,
    list_live_courses,
    list_my_live_courses,
)


router = APIRouter(prefix="/mini", tags=["miniapp"])


@router.get("/courses", response_model=MiniCourseListResponse)
def read_live_courses(session: Session = Depends(get_db_session)) -> MiniCourseListResponse:
    return MiniCourseListResponse(data=list_live_courses(session))


@router.get("/courses/{course_id}", response_model=MiniCourseDetailResponse)
def read_live_course_detail(course_id: str, session: Session = Depends(get_db_session)) -> MiniCourseDetailResponse:
    return MiniCourseDetailResponse(data=get_live_course_detail(session, course_id))


@router.get("/courses/{course_id}/lessons/{lesson_id}", response_model=MiniLessonDetailResponse)
def read_live_lesson_detail(
    course_id: str,
    lesson_id: str,
    session: Session = Depends(get_db_session),
) -> MiniLessonDetailResponse:
    return MiniLessonDetailResponse(data=get_live_lesson_detail(session, course_id, lesson_id, enrolled=False))


@router.get("/courses/{course_id}/assessments/{assessment_id}", response_model=MiniAssessmentDetailResponse)
def read_live_assessment_detail(
    course_id: str,
    assessment_id: str,
    session: Session = Depends(get_db_session),
) -> MiniAssessmentDetailResponse:
    return MiniAssessmentDetailResponse(
        data=get_live_assessment_detail(session, course_id, assessment_id, enrolled=False)
    )


@router.get("/me/courses", response_model=MiniMyCourseListResponse)
def read_my_live_courses(session: Session = Depends(get_db_session)) -> MiniMyCourseListResponse:
    return MiniMyCourseListResponse(data=list_my_live_courses(session))


@router.get("/me/courses/{course_id}", response_model=MiniMyCourseDetailResponse)
def read_my_live_course_detail(course_id: str, session: Session = Depends(get_db_session)) -> MiniMyCourseDetailResponse:
    return MiniMyCourseDetailResponse(data=get_my_live_course_detail(session, course_id))


@router.get("/me/courses/{course_id}/lessons/{lesson_id}", response_model=MiniLessonDetailResponse)
def read_my_live_lesson_detail(
    course_id: str,
    lesson_id: str,
    session: Session = Depends(get_db_session),
) -> MiniLessonDetailResponse:
    return MiniLessonDetailResponse(data=get_live_lesson_detail(session, course_id, lesson_id, enrolled=True))


@router.get("/me/courses/{course_id}/assessments/{assessment_id}", response_model=MiniAssessmentDetailResponse)
def read_my_live_assessment_detail(
    course_id: str,
    assessment_id: str,
    session: Session = Depends(get_db_session),
) -> MiniAssessmentDetailResponse:
    return MiniAssessmentDetailResponse(
        data=get_live_assessment_detail(session, course_id, assessment_id, enrolled=True)
    )
