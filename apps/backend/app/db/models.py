from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.db.mixins import TimestampMixin, UuidPrimaryKeyMixin


class Student(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "students"

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    avatar: Mapped[str | None] = mapped_column(String(255))
    level: Mapped[str] = mapped_column(String(32), nullable=False)
    class_name: Mapped[str | None] = mapped_column(String(120))
    membership_status: Mapped[str] = mapped_column(String(32), nullable=False, default="inactive")
    membership_expire_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    enrollments: Mapped[list[Enrollment]] = relationship(back_populates="student")
    orders: Mapped[list[Order]] = relationship(back_populates="student")


class Course(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "courses"

    name: Mapped[str] = mapped_column(String(160), nullable=False)
    course_type: Mapped[str] = mapped_column(String(32), nullable=False)
    duration: Mapped[str | None] = mapped_column(String(64))
    price: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    benefit: Mapped[str | None] = mapped_column(String(160))
    summary: Mapped[str | None] = mapped_column(Text)
    teacher: Mapped[str] = mapped_column(String(120), nullable=False)
    class_type: Mapped[str | None] = mapped_column(String(64))
    class_schedule: Mapped[str | None] = mapped_column(String(120))
    classroom: Mapped[str | None] = mapped_column(String(120))
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="draft")

    enrollments: Mapped[list[Enrollment]] = relationship(back_populates="course")
    orders: Mapped[list[Order]] = relationship(back_populates="course")
    materials: Mapped[list[TeachingMaterial]] = relationship(back_populates="course")


class Enrollment(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "enrollments"

    student_id: Mapped[str] = mapped_column(ForeignKey("students.id"), nullable=False, index=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id"), nullable=False, index=True)
    class_name: Mapped[str | None] = mapped_column(String(120))
    teacher: Mapped[str | None] = mapped_column(String(120))
    classroom: Mapped[str | None] = mapped_column(String(120))
    service_status: Mapped[str] = mapped_column(String(32), nullable=False, default="active")
    lesson_progress: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    student: Mapped[Student] = relationship(back_populates="enrollments")
    course: Mapped[Course] = relationship(back_populates="enrollments")


class Order(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "orders"

    student_id: Mapped[str] = mapped_column(ForeignKey("students.id"), nullable=False, index=True)
    course_id: Mapped[str | None] = mapped_column(ForeignKey("courses.id"), index=True)
    business_type: Mapped[str] = mapped_column(String(32), nullable=False)
    target_id: Mapped[str | None] = mapped_column(String(64))
    target_name: Mapped[str] = mapped_column(String(160), nullable=False)
    class_name: Mapped[str | None] = mapped_column(String(120))
    teacher: Mapped[str | None] = mapped_column(String(120))
    price: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    benefit: Mapped[str | None] = mapped_column(String(160))
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="created")
    payment_status: Mapped[str] = mapped_column(String(32), nullable=False, default="pending")
    paid: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    student: Mapped[Student] = relationship(back_populates="orders")
    course: Mapped[Course | None] = relationship(back_populates="orders")


class TeachingMaterial(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "teaching_materials"

    title: Mapped[str] = mapped_column(String(160), nullable=False)
    series: Mapped[str] = mapped_column(String(120), nullable=False)
    level: Mapped[str] = mapped_column(String(32), nullable=False)
    language: Mapped[str] = mapped_column(String(32), nullable=False, default="jp")
    version: Mapped[str] = mapped_column(String(32), nullable=False, default="v1.0")
    summary: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="draft")
    visibility: Mapped[str] = mapped_column(String(32), nullable=False, default="internal")
    cover_asset_url: Mapped[str | None] = mapped_column(String(255))
    course_id: Mapped[str | None] = mapped_column(ForeignKey("courses.id"), index=True)

    course: Mapped[Course | None] = relationship(back_populates="materials")
    units: Mapped[list[MaterialUnit]] = relationship(back_populates="material")
    publish_records: Mapped[list[MaterialPublishRecord]] = relationship(back_populates="material")


class MaterialUnit(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "material_units"

    material_id: Mapped[str] = mapped_column(ForeignKey("teaching_materials.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    code: Mapped[str | None] = mapped_column(String(64))
    learning_goal: Mapped[str | None] = mapped_column(Text)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="draft")

    material: Mapped[TeachingMaterial] = relationship(back_populates="units")
    items: Mapped[list[MaterialItem]] = relationship(back_populates="unit")


class MediaAsset(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "media_assets"

    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    asset_type: Mapped[str] = mapped_column(String(32), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(120), nullable=False)
    storage_key: Mapped[str] = mapped_column(String(255), nullable=False)
    file_size: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    duration_seconds: Mapped[int | None] = mapped_column(Integer)
    visibility: Mapped[str] = mapped_column(String(32), nullable=False, default="internal")
    uploaded_by: Mapped[str | None] = mapped_column(String(120))

    items: Mapped[list[MaterialItem]] = relationship(back_populates="asset")


class MaterialItem(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "material_items"

    unit_id: Mapped[str] = mapped_column(ForeignKey("material_units.id"), nullable=False, index=True)
    asset_id: Mapped[str | None] = mapped_column(ForeignKey("media_assets.id"), index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    item_type: Mapped[str] = mapped_column(String(32), nullable=False)
    content_text: Mapped[str | None] = mapped_column(Text)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    visibility: Mapped[str] = mapped_column(String(32), nullable=False, default="teacher")
    required: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    unit: Mapped[MaterialUnit] = relationship(back_populates="items")
    asset: Mapped[MediaAsset | None] = relationship(back_populates="items")


class MaterialPublishRecord(UuidPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "material_publish_records"

    material_id: Mapped[str] = mapped_column(ForeignKey("teaching_materials.id"), nullable=False, index=True)
    version: Mapped[str] = mapped_column(String(32), nullable=False)
    publish_scope: Mapped[str] = mapped_column(String(64), nullable=False, default="internal")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="draft")
    note: Mapped[str | None] = mapped_column(Text)
    published_by: Mapped[str | None] = mapped_column(String(120))

    material: Mapped[TeachingMaterial] = relationship(back_populates="publish_records")
