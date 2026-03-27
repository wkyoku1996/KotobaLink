"""initial core tables

Revision ID: 20260323_0001
Revises:
Create Date: 2026-03-23 12:58:00
"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260323_0001"
down_revision: str | None = None
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "students",
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("avatar", sa.String(length=255), nullable=True),
        sa.Column("level", sa.String(length=32), nullable=False),
        sa.Column("class_name", sa.String(length=120), nullable=True),
        sa.Column("membership_status", sa.String(length=32), nullable=False),
        sa.Column("membership_expire_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "courses",
        sa.Column("name", sa.String(length=160), nullable=False),
        sa.Column("course_type", sa.String(length=32), nullable=False),
        sa.Column("duration", sa.String(length=64), nullable=True),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("benefit", sa.String(length=160), nullable=True),
        sa.Column("summary", sa.Text(), nullable=True),
        sa.Column("teacher", sa.String(length=120), nullable=False),
        sa.Column("class_type", sa.String(length=64), nullable=True),
        sa.Column("class_schedule", sa.String(length=120), nullable=True),
        sa.Column("classroom", sa.String(length=120), nullable=True),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "enrollments",
        sa.Column("student_id", sa.String(), nullable=False),
        sa.Column("course_id", sa.String(), nullable=False),
        sa.Column("class_name", sa.String(length=120), nullable=True),
        sa.Column("teacher", sa.String(length=120), nullable=True),
        sa.Column("classroom", sa.String(length=120), nullable=True),
        sa.Column("service_status", sa.String(length=32), nullable=False),
        sa.Column("lesson_progress", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["course_id"], ["courses.id"]),
        sa.ForeignKeyConstraint(["student_id"], ["students.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_enrollments_course_id"), "enrollments", ["course_id"], unique=False)
    op.create_index(op.f("ix_enrollments_student_id"), "enrollments", ["student_id"], unique=False)
    op.create_table(
        "orders",
        sa.Column("student_id", sa.String(), nullable=False),
        sa.Column("course_id", sa.String(), nullable=True),
        sa.Column("business_type", sa.String(length=32), nullable=False),
        sa.Column("target_id", sa.String(length=64), nullable=True),
        sa.Column("target_name", sa.String(length=160), nullable=False),
        sa.Column("class_name", sa.String(length=120), nullable=True),
        sa.Column("teacher", sa.String(length=120), nullable=True),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("benefit", sa.String(length=160), nullable=True),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("payment_status", sa.String(length=32), nullable=False),
        sa.Column("paid", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["course_id"], ["courses.id"]),
        sa.ForeignKeyConstraint(["student_id"], ["students.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_orders_course_id"), "orders", ["course_id"], unique=False)
    op.create_index(op.f("ix_orders_student_id"), "orders", ["student_id"], unique=False)
    op.create_table(
        "teaching_materials",
        sa.Column("title", sa.String(length=160), nullable=False),
        sa.Column("series", sa.String(length=120), nullable=False),
        sa.Column("level", sa.String(length=32), nullable=False),
        sa.Column("language", sa.String(length=32), nullable=False),
        sa.Column("version", sa.String(length=32), nullable=False),
        sa.Column("summary", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("visibility", sa.String(length=32), nullable=False),
        sa.Column("cover_asset_url", sa.String(length=255), nullable=True),
        sa.Column("course_id", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["course_id"], ["courses.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_teaching_materials_course_id"), "teaching_materials", ["course_id"], unique=False)
    op.create_table(
        "material_units",
        sa.Column("material_id", sa.String(), nullable=False),
        sa.Column("title", sa.String(length=160), nullable=False),
        sa.Column("code", sa.String(length=64), nullable=True),
        sa.Column("learning_goal", sa.Text(), nullable=True),
        sa.Column("sort_order", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["material_id"], ["teaching_materials.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_material_units_material_id"), "material_units", ["material_id"], unique=False)
    op.create_table(
        "media_assets",
        sa.Column("file_name", sa.String(length=255), nullable=False),
        sa.Column("asset_type", sa.String(length=32), nullable=False),
        sa.Column("mime_type", sa.String(length=120), nullable=False),
        sa.Column("storage_key", sa.String(length=255), nullable=False),
        sa.Column("file_size", sa.Integer(), nullable=False),
        sa.Column("duration_seconds", sa.Integer(), nullable=True),
        sa.Column("visibility", sa.String(length=32), nullable=False),
        sa.Column("uploaded_by", sa.String(length=120), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "material_items",
        sa.Column("unit_id", sa.String(), nullable=False),
        sa.Column("asset_id", sa.String(), nullable=True),
        sa.Column("title", sa.String(length=160), nullable=False),
        sa.Column("item_type", sa.String(length=32), nullable=False),
        sa.Column("content_text", sa.Text(), nullable=True),
        sa.Column("sort_order", sa.Integer(), nullable=False),
        sa.Column("visibility", sa.String(length=32), nullable=False),
        sa.Column("required", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["asset_id"], ["media_assets.id"]),
        sa.ForeignKeyConstraint(["unit_id"], ["material_units.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_material_items_asset_id"), "material_items", ["asset_id"], unique=False)
    op.create_index(op.f("ix_material_items_unit_id"), "material_items", ["unit_id"], unique=False)
    op.create_table(
        "material_publish_records",
        sa.Column("material_id", sa.String(), nullable=False),
        sa.Column("version", sa.String(length=32), nullable=False),
        sa.Column("publish_scope", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("note", sa.Text(), nullable=True),
        sa.Column("published_by", sa.String(length=120), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["material_id"], ["teaching_materials.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_material_publish_records_material_id"),
        "material_publish_records",
        ["material_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_material_publish_records_material_id"),
        table_name="material_publish_records",
    )
    op.drop_table("material_publish_records")
    op.drop_index(op.f("ix_material_items_unit_id"), table_name="material_items")
    op.drop_index(op.f("ix_material_items_asset_id"), table_name="material_items")
    op.drop_table("material_items")
    op.drop_table("media_assets")
    op.drop_index(op.f("ix_material_units_material_id"), table_name="material_units")
    op.drop_table("material_units")
    op.drop_index(op.f("ix_teaching_materials_course_id"), table_name="teaching_materials")
    op.drop_table("teaching_materials")
    op.drop_index(op.f("ix_orders_student_id"), table_name="orders")
    op.drop_index(op.f("ix_orders_course_id"), table_name="orders")
    op.drop_table("orders")
    op.drop_index(op.f("ix_enrollments_student_id"), table_name="enrollments")
    op.drop_index(op.f("ix_enrollments_course_id"), table_name="enrollments")
    op.drop_table("enrollments")
    op.drop_table("courses")
    op.drop_table("students")
