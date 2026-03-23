from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.modules.auth.router import router as auth_router
from app.modules.course.router import router as course_router
from app.modules.materials.router import router as materials_router
from app.modules.order.router import router as order_router
from app.modules.student.router import router as student_router


api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(auth_router, prefix="/api/v1")
api_router.include_router(student_router, prefix="/api/v1")
api_router.include_router(course_router, prefix="/api/v1")
api_router.include_router(materials_router, prefix="/api/v1")
api_router.include_router(order_router, prefix="/api/v1")
