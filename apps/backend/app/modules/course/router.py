from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db_session
from app.modules.course.schemas import CourseCatalogResponse
from app.modules.course.service import list_catalog_courses


router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("/catalog", response_model=CourseCatalogResponse)
def read_course_catalog(session: Session = Depends(get_db_session)) -> CourseCatalogResponse:
    return CourseCatalogResponse(data=list_catalog_courses(session))
