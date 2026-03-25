"""add material release versions

Revision ID: 20260325_0002
Revises: 20260323_0001
Create Date: 2026-03-25 17:40:00
"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


revision: str = "20260325_0002"
down_revision: str | None = "20260323_0001"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "material_release_versions",
        sa.Column("material_id", sa.String(), nullable=False),
        sa.Column("version_number", sa.String(length=32), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("snapshot_json", sa.JSON(), nullable=False),
        sa.Column("note", sa.Text(), nullable=True),
        sa.Column("published_by", sa.String(length=120), nullable=True),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("is_live", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(["material_id"], ["teaching_materials.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_material_release_versions_material_id"),
        "material_release_versions",
        ["material_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_material_release_versions_material_id"), table_name="material_release_versions")
    op.drop_table("material_release_versions")
