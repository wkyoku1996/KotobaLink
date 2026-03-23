from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.config.settings import get_media_root_path, get_settings
from app.db.models import MaterialItem, MaterialPublishRecord, MaterialUnit, MediaAsset, TeachingMaterial
from app.modules.materials.schemas import (
    MaterialAssetItem,
    MaterialAssetListItem,
    MaterialAssetUploadData,
    MaterialDetailItem,
    MaterialDetailUnitItem,
    MaterialJsonV2Asset,
    MaterialJsonV2AssetMeta,
    MaterialJsonV2Document,
    MaterialJsonV2Metadata,
    MaterialJsonV2Publish,
    MaterialJsonV2Section,
    MaterialJsonV2Unit,
    MaterialLibraryItem,
    MaterialPublishListItem,
    MaterialUnitContentItem,
    MaterialUnitDetailItem,
    MaterialUnitItem,
)


def list_materials(session: Session) -> list[MaterialLibraryItem]:
    materials = (
        session.execute(
            select(TeachingMaterial)
            .options(
                selectinload(TeachingMaterial.units).selectinload(MaterialUnit.items),
            )
            .order_by(TeachingMaterial.created_at.asc())
        )
        .scalars()
        .all()
    )
    return [
        MaterialLibraryItem(
            id=material.id,
            title=material.title,
            series=material.series,
            level=material.level,
            language=material.language,
            version=material.version,
            status=material.status,
            unit_count=len(material.units),
            resource_count=sum(1 for unit in material.units for item in unit.items if item.asset_id),
        )
        for material in materials
    ]


def list_material_units(session: Session) -> list[MaterialUnitItem]:
    units = (
        session.execute(
            select(MaterialUnit)
            .options(
                selectinload(MaterialUnit.material),
                selectinload(MaterialUnit.items),
            )
            .order_by(MaterialUnit.created_at.asc(), MaterialUnit.sort_order.asc())
        )
        .scalars()
        .all()
    )
    return [
        MaterialUnitItem(
            id=unit.id,
            material_id=unit.material_id,
            material_title=unit.material.title,
            title=unit.title,
            code=unit.code,
            learning_goal=unit.learning_goal,
            status=unit.status,
            sort_order=unit.sort_order,
            content_types=sorted({item.item_type for item in unit.items}),
            resource_count=sum(1 for item in unit.items if item.asset_id),
        )
        for unit in units
    ]


def get_material_detail(session: Session, material_id: str) -> MaterialDetailItem:
    material = session.execute(
        select(TeachingMaterial)
        .options(
            selectinload(TeachingMaterial.units).selectinload(MaterialUnit.items),
        )
        .where(TeachingMaterial.id == material_id)
    ).scalar_one_or_none()

    if material is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material not found")

    return MaterialDetailItem(
        id=material.id,
        title=material.title,
        series=material.series,
        level=material.level,
        language=material.language,
        version=material.version,
        summary=material.summary,
        status=material.status,
        visibility=material.visibility,
        unit_count=len(material.units),
        resource_count=sum(1 for unit in material.units for item in unit.items if item.asset_id),
        units=[
            MaterialDetailUnitItem(
                id=unit.id,
                title=unit.title,
                code=unit.code,
                status=unit.status,
                sort_order=unit.sort_order,
                item_count=len(unit.items),
            )
            for unit in sorted(material.units, key=lambda unit: unit.sort_order)
        ],
    )


def export_material_json_v2(session: Session, material_id: str) -> MaterialJsonV2Document:
    material = session.execute(
        select(TeachingMaterial)
        .options(
            selectinload(TeachingMaterial.units)
            .selectinload(MaterialUnit.items)
            .selectinload(MaterialItem.asset),
            selectinload(TeachingMaterial.publish_records),
        )
        .where(TeachingMaterial.id == material_id)
    ).scalar_one_or_none()

    if material is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material not found")

    assets_by_id: dict[str, MaterialJsonV2Asset] = {}
    units: list[MaterialJsonV2Unit] = []

    for unit in sorted(material.units, key=lambda current: current.sort_order):
        sections: list[MaterialJsonV2Section] = []
        for item in sorted(unit.items, key=lambda current: current.sort_order):
            if item.asset is not None:
                assets_by_id[item.asset.id] = MaterialJsonV2Asset(
                    id=item.asset.id,
                    file_name=item.asset.file_name,
                    asset_type=item.asset.asset_type,
                    mime_type=item.asset.mime_type,
                    storage_key=item.asset.storage_key,
                    file_url=_build_media_url(item.asset.storage_key),
                    visibility=item.asset.visibility,
                    meta=MaterialJsonV2AssetMeta(
                        file_size=item.asset.file_size,
                        duration_seconds=item.asset.duration_seconds,
                    ),
                )

            section_type = _map_item_type_to_section_type(item.item_type)
            sections.append(
                MaterialJsonV2Section(
                    id=f"section-{item.id}",
                    type=section_type,
                    title=item.title,
                    sort_order=item.sort_order,
                    enabled=True,
                    content=_build_section_content(item, section_type),
                )
            )

        units.append(
            MaterialJsonV2Unit(
                id=unit.id,
                title=unit.title,
                code=unit.code,
                sort_order=unit.sort_order,
                status=unit.status,
                learning_goal=unit.learning_goal,
                can_do=[],
                teacher_notes=[],
                sections=sections,
            )
        )

    latest_publish_record = sorted(
        material.publish_records,
        key=lambda current: current.created_at,
        reverse=True,
    )
    current_publish = latest_publish_record[0] if latest_publish_record else None

    return MaterialJsonV2Document(
        schema_version="kotobalink.material.v2",
        id=material.id,
        title=material.title,
        series=material.series,
        level=material.level,
        language=material.language,
        version=material.version,
        summary=material.summary,
        status=material.status,
        visibility=material.visibility,
        tags=[],
        cover_asset_ref=None,
        course_refs=[material.course_id] if material.course_id else [],
        metadata=MaterialJsonV2Metadata(
            publisher=None,
            authors=[],
            recommended_age=None,
            estimated_unit_duration_minutes=None,
        ),
        units=units,
        assets=list(assets_by_id.values()),
        publish=MaterialJsonV2Publish(
            version=current_publish.version if current_publish else material.version,
            status=current_publish.status if current_publish else material.status,
            scope=current_publish.publish_scope if current_publish else material.visibility,
            note=current_publish.note if current_publish else None,
        ),
    )


def get_material_unit_detail(session: Session, unit_id: str) -> MaterialUnitDetailItem:
    unit = session.execute(
        select(MaterialUnit)
        .options(
            selectinload(MaterialUnit.material),
            selectinload(MaterialUnit.items).selectinload(MaterialItem.asset),
        )
        .where(MaterialUnit.id == unit_id)
    ).scalar_one_or_none()

    if unit is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material unit not found")

    return MaterialUnitDetailItem(
        id=unit.id,
        material_id=unit.material_id,
        material_title=unit.material.title,
        title=unit.title,
        code=unit.code,
        learning_goal=unit.learning_goal,
        status=unit.status,
        sort_order=unit.sort_order,
        content_types=sorted({item.item_type for item in unit.items}),
        resource_count=sum(1 for item in unit.items if item.asset_id),
        items=[
            MaterialUnitContentItem(
                id=item.id,
                title=item.title,
                item_type=item.item_type,
                visibility=item.visibility,
                required=item.required,
                content_text=item.content_text,
                asset=(
                    MaterialAssetItem(
                        id=item.asset.id,
                        file_name=item.asset.file_name,
                        asset_type=item.asset.asset_type,
                        mime_type=item.asset.mime_type,
                        file_size=item.asset.file_size,
                        duration_seconds=item.asset.duration_seconds,
                        file_url=_build_media_url(item.asset.storage_key),
                    )
                    if item.asset
                    else None
                ),
            )
            for item in sorted(unit.items, key=lambda item: item.sort_order)
        ],
    )


def list_material_assets(session: Session) -> list[MaterialAssetListItem]:
    assets = session.execute(select(MediaAsset).order_by(MediaAsset.created_at.asc())).scalars().all()
    return [
        MaterialAssetListItem(
            id=asset.id,
            file_name=asset.file_name,
            asset_type=asset.asset_type,
            mime_type=asset.mime_type,
            file_size=asset.file_size,
            duration_seconds=asset.duration_seconds,
            visibility=asset.visibility,
            uploaded_by=asset.uploaded_by,
            file_url=_build_media_url(asset.storage_key),
        )
        for asset in assets
    ]


def list_material_publish_records(session: Session) -> list[MaterialPublishListItem]:
    records = (
        session.execute(
            select(MaterialPublishRecord)
            .options(selectinload(MaterialPublishRecord.material))
            .order_by(MaterialPublishRecord.created_at.asc())
        )
        .scalars()
        .all()
    )
    return [
        MaterialPublishListItem(
            id=record.id,
            material_id=record.material_id,
            material_title=record.material.title,
            version=record.version,
            publish_scope=record.publish_scope,
            status=record.status,
            note=record.note,
            published_by=record.published_by,
        )
        for record in records
    ]


def upload_material_asset(
    session: Session,
    file: UploadFile,
    asset_type: str,
    visibility: str,
    uploaded_by: str | None,
    unit_id: str | None,
    item_type: str | None,
    item_title: str | None,
    content_text: str | None,
) -> MaterialAssetUploadData:
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing file name")

    storage_key = _save_upload_file(file)
    file_path = get_media_root_path() / storage_key

    asset = MediaAsset(
        file_name=file.filename,
        asset_type=asset_type,
        mime_type=file.content_type or "application/octet-stream",
        storage_key=storage_key,
        file_size=file_path.stat().st_size,
        duration_seconds=None,
        visibility=visibility,
        uploaded_by=uploaded_by,
    )
    session.add(asset)
    session.flush()

    if unit_id:
        unit = session.get(MaterialUnit, unit_id)
        if unit is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material unit not found")

        session.add(
            MaterialItem(
                unit_id=unit_id,
                asset_id=asset.id,
                title=item_title or file.filename,
                item_type=item_type or asset_type,
                content_text=content_text,
                visibility=visibility,
                required=False,
            )
        )

    session.commit()
    session.refresh(asset)

    return MaterialAssetUploadData(
        asset=MaterialAssetListItem(
            id=asset.id,
            file_name=asset.file_name,
            asset_type=asset.asset_type,
            mime_type=asset.mime_type,
            file_size=asset.file_size,
            duration_seconds=asset.duration_seconds,
            visibility=asset.visibility,
            uploaded_by=asset.uploaded_by,
            file_url=_build_media_url(asset.storage_key),
        )
    )


def _save_upload_file(file: UploadFile) -> str:
    extension = Path(file.filename or "").suffix
    storage_dir = get_media_root_path() / "materials" / "uploads"
    storage_dir.mkdir(parents=True, exist_ok=True)

    generated_name = f"{uuid4()}{extension}"
    storage_key = f"materials/uploads/{generated_name}"
    file_path = get_media_root_path() / storage_key
    file_path.write_bytes(file.file.read())
    return storage_key


def _build_media_url(storage_key: str) -> str:
    settings = get_settings()
    return f"{settings.media_url}/{storage_key}".replace("//", "/")


def _map_item_type_to_section_type(item_type: str) -> str:
    mapping = {
        "audio": "dialogue",
        "article": "article",
        "reading": "article",
        "worksheet": "resource",
        "pdf": "resource",
        "video": "resource",
        "image": "resource",
        "exercise": "exercise",
        "homework": "homework",
        "grammar": "grammar",
        "vocabulary": "vocabulary",
        "expression": "expression",
    }
    return mapping.get(item_type, "resource")


def _build_section_content(item: MaterialItem, section_type: str) -> dict:
    asset_ref = item.asset.id if item.asset else None

    if section_type == "dialogue":
        return {
            "transcript": item.content_text,
            "translation": None,
            "audio_refs": [asset_ref] if asset_ref else [],
        }

    if section_type == "article":
        return {
            "text": item.content_text,
            "translation": None,
            "asset_refs": [asset_ref] if asset_ref else [],
        }

    if section_type == "vocabulary":
        return {
            "items": _parse_vocabulary_lines(item.content_text),
            "asset_refs": [asset_ref] if asset_ref else [],
        }

    if section_type == "grammar":
        return {
            "points": _parse_grammar_lines(item.content_text),
            "asset_refs": [asset_ref] if asset_ref else [],
        }

    if section_type == "expression":
        return {
            "expressions": [
                {
                    "id": f"expression-{item.id}",
                    "text": item.content_text,
                }
            ],
            "asset_refs": [asset_ref] if asset_ref else [],
        }

    if section_type == "exercise":
        return {
            "questions": [],
            "prompt": item.content_text,
            "asset_ref": asset_ref,
        }

    if section_type == "homework":
        return {
            "tasks": [
                {
                    "id": f"task-{item.id}",
                    "title": item.title,
                    "description": item.content_text,
                    "asset_refs": [asset_ref] if asset_ref else [],
                }
            ]
        }

    return {
        "items": [
            {
                "id": f"resource-{item.id}",
                "title": item.title,
                "description": item.content_text,
                "asset_ref": asset_ref,
            }
        ]
    }


def _parse_vocabulary_lines(content_text: str | None) -> list[dict]:
    if not content_text:
        return []

    items: list[dict] = []
    for index, line in enumerate(content_text.splitlines(), start=1):
        parts = [part.strip() for part in line.split("|")]
        if len(parts) < 3:
            continue
        word, reading, meaning = parts[:3]
        example = parts[3] if len(parts) > 3 else None
        items.append(
            {
                "id": f"vocab-{index}",
                "word": word,
                "reading": reading,
                "meaning": meaning,
                "example": example,
            }
        )
    return items


def _parse_grammar_lines(content_text: str | None) -> list[dict]:
    if not content_text:
        return []

    points: list[dict] = []
    for index, line in enumerate(content_text.splitlines(), start=1):
        parts = [part.strip() for part in line.split("|")]
        if len(parts) < 2:
            continue
        pattern = parts[0]
        meaning = parts[1]
        examples = []
        if len(parts) > 2 and parts[2]:
            examples = [example.strip() for example in parts[2].split(";") if example.strip()]
        points.append(
            {
                "id": f"grammar-{index}",
                "pattern": pattern,
                "meaning": meaning,
                "explanation": None,
                "examples": examples,
            }
        )
    return points
