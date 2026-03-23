from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db_session
from app.modules.student.schemas import StudentCourseListResponse, StudentProfileResponse
from app.modules.student.service import get_current_student_profile, list_current_student_courses


router = APIRouter(prefix="/students", tags=["students"])


@router.get("/profile", response_model=StudentProfileResponse)
def read_student_profile(session: Session = Depends(get_db_session)) -> StudentProfileResponse:
    try:
        profile = get_current_student_profile(session)
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    return StudentProfileResponse(data=profile)


@router.get("/courses", response_model=StudentCourseListResponse)
def read_student_courses(session: Session = Depends(get_db_session)) -> StudentCourseListResponse:
    return StudentCourseListResponse(data=list_current_student_courses(session))
