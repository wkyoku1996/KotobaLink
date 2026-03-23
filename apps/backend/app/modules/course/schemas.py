from pydantic import BaseModel

from app.common.schemas import ApiResponse


class CourseItem(BaseModel):
    id: str
    name: str
    teacher: str
    status: str
    price: int


class CourseCatalogResponse(ApiResponse):
    data: list[CourseItem]
