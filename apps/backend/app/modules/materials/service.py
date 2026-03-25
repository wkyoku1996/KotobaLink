from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.config.settings import get_media_root_path, get_settings
from app.db.models import (
    Course,
    MaterialItem,
    MaterialPublishRecord,
    MaterialReleaseVersion,
    MaterialUnit,
    MediaAsset,
    TeachingMaterial,
)
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
    MaterialReleaseCreateInput,
    MaterialReleaseVersionDetail,
    MaterialReleaseVersionItem,
    PackageTemplateContent,
    PackageTemplateCourse,
    PackageTemplateSaveData,
    PackageTemplateDocument,
    PackageTemplateDeleteData,
    PackageTemplateResource,
    PackageTemplateResourceMeta,
    PackageTemplateUnit,
    MaterialPublishListItem,
    MaterialReleaseDeleteData,
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


def export_package_template(session: Session, material_id: str) -> PackageTemplateDocument:
    material = _load_material_for_template(session, material_id)

    course = material.course or Course(
        id=material.course_id or f"{material.id}-course",
        name=material.title,
        course_type="material_package",
        duration=None,
        price=0,
        benefit=None,
        summary=material.summary,
        teacher="Unassigned",
        class_type=None,
        class_schedule=None,
        classroom=None,
        status=material.status,
    )

    return PackageTemplateDocument(
        schema_version="kotobalink.package.v1",
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
        courses=[
            PackageTemplateCourse(
                id=course.id,
                title=course.name,
                status=course.status,
                summary=course.summary,
                units=[
                    PackageTemplateUnit(
                        id=unit.id,
                        title=unit.title,
                        code=unit.code,
                        sort_order=unit.sort_order,
                        status=unit.status,
                        learning_goal=unit.learning_goal,
                        contents=[
                            PackageTemplateContent(
                                id=item.id,
                                type=_map_item_type_to_section_type(item.item_type),
                                title=item.title,
                                sort_order=item.sort_order,
                                enabled=True,
                                data=_build_package_content_data(item),
                                resources=[_build_package_resource(item.asset)] if item.asset else [],
                            )
                            for item in sorted(unit.items, key=lambda current: current.sort_order)
                        ],
                    )
                    for unit in sorted(material.units, key=lambda current: current.sort_order)
                ],
            )
        ],
    )


def create_package_template(session: Session, template: PackageTemplateDocument) -> PackageTemplateDocument:
    existing_material = session.get(TeachingMaterial, template.id)
    if existing_material is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Package id already exists")

    material = TeachingMaterial(
        id=template.id,
        title=template.title,
        series=template.series,
        level=template.level,
        language=template.language,
        version=template.version,
        summary=template.summary,
        status=template.status,
        visibility=template.visibility,
        cover_asset_url=None,
        course_id=None,
    )
    session.add(material)
    session.flush()

    _apply_package_template(session, material, template)
    return export_package_template(session, material.id)


def save_package_template(
    session: Session,
    material_id: str,
    template: PackageTemplateDocument,
) -> PackageTemplateSaveData:
    material = _load_material_for_template(session, material_id)

    if template.id != material_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Template id does not match material id")

    _apply_package_template(session, material, template)
    saved_template = export_package_template(session, material_id)
    created_release = _create_material_release_snapshot(
        session=session,
        material=material,
        template=saved_template,
        note="由教材内容编辑台提交生成",
        published_by=None,
        status="draft",
    )
    return PackageTemplateSaveData(
        template=saved_template,
        created_release=created_release,
    )


def delete_package_template(session: Session, material_id: str) -> PackageTemplateDeleteData:
    material = _load_material_for_template(session, material_id)

    for record in material.publish_records:
        session.delete(record)
    for release in material.release_versions:
        session.delete(release)

    _delete_material_units(session, material)

    course = material.course
    session.delete(material)
    session.flush()

    if course is not None:
        remaining_material = session.execute(
            select(TeachingMaterial.id).where(TeachingMaterial.course_id == course.id).limit(1)
        ).scalar_one_or_none()
        if remaining_material is None:
            session.delete(course)

    _cleanup_orphan_assets(session)
    session.commit()
    return PackageTemplateDeleteData(id=material_id, deleted=True)


def create_material_release_version(
    session: Session,
    material_id: str,
    payload: MaterialReleaseCreateInput,
) -> MaterialReleaseVersionDetail:
    material = _load_material_for_template(session, material_id)
    current_template = export_package_template(session, material_id)
    return _create_material_release_snapshot(
        session=session,
        material=material,
        template=current_template,
        note=payload.note,
        published_by=payload.published_by,
        status="draft",
    )


def list_material_release_versions(session: Session, material_id: str) -> list[MaterialReleaseVersionItem]:
    material = _load_material_for_template(session, material_id)
    releases = (
        session.execute(
            select(MaterialReleaseVersion)
            .where(MaterialReleaseVersion.material_id == material_id)
            .order_by(MaterialReleaseVersion.created_at.desc())
        )
        .scalars()
        .all()
    )
    return [_build_release_item(release, material.title) for release in releases]


def get_material_release_version(
    session: Session,
    material_id: str,
    release_id: str,
) -> MaterialReleaseVersionDetail:
    material = _load_material_for_template(session, material_id)
    release = _load_material_release_version(session, material_id, release_id)

    return _build_release_detail(release, material.title)


def go_live_material_release_version(
    session: Session,
    material_id: str,
    release_id: str,
) -> MaterialReleaseVersionDetail:
    material = _load_material_for_template(session, material_id)
    release = _load_material_release_version(session, material_id, release_id)

    active_releases = (
        session.execute(
            select(MaterialReleaseVersion).where(MaterialReleaseVersion.material_id == material_id)
        )
        .scalars()
        .all()
    )
    for candidate in active_releases:
        if candidate.id == release.id:
            candidate.status = "live"
            candidate.is_live = True
        elif candidate.is_live:
            candidate.status = "published"
            candidate.is_live = False

    session.commit()
    session.refresh(release)
    return _build_release_detail(release, material.title)


def archive_material_release_version(
    session: Session,
    material_id: str,
    release_id: str,
) -> MaterialReleaseVersionDetail:
    material = _load_material_for_template(session, material_id)
    release = _load_material_release_version(session, material_id, release_id)

    release.status = "archived"
    release.is_live = False
    session.commit()
    session.refresh(release)
    return _build_release_detail(release, material.title)


def delete_material_release_version(
    session: Session,
    material_id: str,
    release_id: str,
) -> MaterialReleaseDeleteData:
    release = _load_material_release_version(session, material_id, release_id)
    if release.is_live:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Live release version must be archived before deletion",
        )

    session.delete(release)
    session.commit()
    return MaterialReleaseDeleteData(id=release_id, deleted=True)


def restore_material_release_version_as_new_draft(
    session: Session,
    material_id: str,
    release_id: str,
) -> PackageTemplateSaveData:
    material = _load_material_for_template(session, material_id)
    release = _load_material_release_version(session, material_id, release_id)
    template = PackageTemplateDocument.model_validate(release.snapshot_json)

    _apply_package_template(session, material, template)
    restored_template = export_package_template(session, material_id)
    created_release = _create_material_release_snapshot(
        session=session,
        material=material,
        template=restored_template,
        note=f"基于 {release.version_number} 恢复生成",
        published_by=None,
        status="draft",
    )
    return PackageTemplateSaveData(
        template=restored_template,
        created_release=created_release,
    )


def _create_material_release_snapshot(
    session: Session,
    material: TeachingMaterial,
    template: PackageTemplateDocument,
    note: str | None,
    published_by: str | None,
    status: str,
) -> MaterialReleaseVersionDetail:
    latest_number = _get_next_release_version_number(session, material.id)
    release = MaterialReleaseVersion(
        material_id=material.id,
        version_number=latest_number,
        status=status,
        snapshot_json=template.model_dump(),
        note=note,
        published_by=published_by,
        published_at=datetime.now(timezone.utc),
        is_live=False,
    )
    session.add(release)
    session.commit()
    session.refresh(release)
    return _build_release_detail(release, material.title)


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


def _build_package_content_data(item: MaterialItem) -> dict:
    return _build_section_content(item, _map_item_type_to_section_type(item.item_type))


def _build_package_resource(asset: MediaAsset) -> PackageTemplateResource:
    return PackageTemplateResource(
        id=asset.id,
        file_name=asset.file_name,
        resource_type=asset.asset_type,
        mime_type=asset.mime_type,
        storage_key=asset.storage_key,
        file_url=_build_media_url(asset.storage_key),
        visibility=asset.visibility,
        meta=PackageTemplateResourceMeta(
            file_size=asset.file_size,
            duration_seconds=asset.duration_seconds,
        ),
    )


def _load_material_for_template(session: Session, material_id: str) -> TeachingMaterial:
    material = session.execute(
        select(TeachingMaterial)
        .options(
            selectinload(TeachingMaterial.course),
            selectinload(TeachingMaterial.units)
            .selectinload(MaterialUnit.items)
            .selectinload(MaterialItem.asset),
            selectinload(TeachingMaterial.publish_records),
            selectinload(TeachingMaterial.release_versions),
        )
        .where(TeachingMaterial.id == material_id)
    ).scalar_one_or_none()

    if material is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material not found")

    return material


def _load_material_release_version(
    session: Session,
    material_id: str,
    release_id: str,
) -> MaterialReleaseVersion:
    release = session.execute(
        select(MaterialReleaseVersion).where(
            MaterialReleaseVersion.material_id == material_id,
            MaterialReleaseVersion.id == release_id,
        )
    ).scalar_one_or_none()

    if release is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Release version not found")

    return release


def _apply_package_template(
    session: Session,
    material: TeachingMaterial,
    template: PackageTemplateDocument,
) -> None:
    if len(template.courses) != 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current implementation supports exactly one course per package",
        )

    course_template = template.courses[0]
    course = material.course
    if course is None:
        course = session.get(Course, course_template.id)

    if course is None:
        course = Course(
            id=course_template.id,
            name=course_template.title,
            course_type="material_package",
            duration=None,
            price=0,
            benefit=None,
            summary=course_template.summary,
            teacher="Unassigned",
            class_type=None,
            class_schedule=None,
            classroom=None,
            status=course_template.status,
        )
        session.add(course)
        session.flush()
    else:
        course.name = course_template.title
        course.summary = course_template.summary
        course.status = course_template.status

    material.title = template.title
    material.series = template.series
    material.level = template.level
    material.language = template.language
    material.version = template.version
    material.summary = template.summary
    material.status = template.status
    material.visibility = template.visibility
    material.course_id = course.id

    _delete_material_units(session, material)

    for unit_template in sorted(course_template.units, key=lambda current: current.sort_order):
        unit = MaterialUnit(
            id=unit_template.id,
            material_id=material.id,
            title=unit_template.title,
            code=unit_template.code,
            learning_goal=unit_template.learning_goal,
            sort_order=unit_template.sort_order,
            status=unit_template.status,
        )
        session.add(unit)
        session.flush()

        for content_template in sorted(unit_template.contents, key=lambda current: current.sort_order):
            asset = None
            if content_template.resources:
                asset = _upsert_asset_from_template(session, content_template.resources[0])

            session.add(
                MaterialItem(
                    id=content_template.id,
                    unit_id=unit.id,
                    asset_id=asset.id if asset else None,
                    title=content_template.title,
                    item_type=_map_section_type_to_item_type(content_template.type),
                    content_text=_build_item_content_text(content_template.type, content_template.data),
                    sort_order=content_template.sort_order,
                    visibility=template.visibility,
                    required=False,
                )
            )

    session.flush()
    _cleanup_orphan_assets(session)
    session.flush()
    session.commit()


def _delete_material_units(session: Session, material: TeachingMaterial) -> None:
    for unit in material.units:
        for item in unit.items:
            session.delete(item)
        session.delete(unit)
    session.flush()


def _cleanup_orphan_assets(session: Session) -> None:
    orphan_assets = session.execute(
        select(MediaAsset)
        .outerjoin(MediaAsset.items)
        .where(MaterialItem.id.is_(None))
    ).scalars().all()
    for asset in orphan_assets:
        session.delete(asset)


def _get_next_release_version_number(session: Session, material_id: str) -> str:
    releases = (
        session.execute(
            select(MaterialReleaseVersion.version_number)
            .where(MaterialReleaseVersion.material_id == material_id)
            .order_by(MaterialReleaseVersion.created_at.desc())
        )
        .scalars()
        .all()
    )
    numeric_versions: list[int] = []
    for value in releases:
        if value.startswith("v"):
            suffix = value[1:]
            if suffix.isdigit():
                numeric_versions.append(int(suffix))
    next_number = max(numeric_versions, default=0) + 1
    return f"v{next_number}"


def _build_release_item(release: MaterialReleaseVersion, material_title: str) -> MaterialReleaseVersionItem:
    return MaterialReleaseVersionItem(
        id=release.id,
        material_id=release.material_id,
        material_title=material_title,
        version_number=release.version_number,
        status=release.status,
        note=release.note,
        published_by=release.published_by,
        published_at=release.published_at.isoformat() if release.published_at else None,
        is_live=release.is_live,
    )


def _build_release_detail(release: MaterialReleaseVersion, material_title: str) -> MaterialReleaseVersionDetail:
    item = _build_release_item(release, material_title)
    return MaterialReleaseVersionDetail(
        **item.model_dump(),
        snapshot_json=release.snapshot_json,
    )


def _upsert_asset_from_template(session: Session, resource: PackageTemplateResource) -> MediaAsset:
    asset = session.get(MediaAsset, resource.id)
    if asset is None:
        asset = MediaAsset(
            id=resource.id,
            file_name=resource.file_name,
            asset_type=resource.resource_type,
            mime_type=resource.mime_type,
            storage_key=resource.storage_key,
            file_size=resource.meta.file_size or 0,
            duration_seconds=resource.meta.duration_seconds,
            visibility=resource.visibility,
            uploaded_by=None,
        )
        session.add(asset)
        session.flush()
        return asset

    asset.file_name = resource.file_name
    asset.asset_type = resource.resource_type
    asset.mime_type = resource.mime_type
    asset.storage_key = resource.storage_key
    asset.file_size = resource.meta.file_size or 0
    asset.duration_seconds = resource.meta.duration_seconds
    asset.visibility = resource.visibility
    return asset


def _map_section_type_to_item_type(section_type: str) -> str:
    mapping = {
        "dialogue": "audio",
        "article": "article",
        "vocabulary": "vocabulary",
        "grammar": "grammar",
        "expression": "expression",
        "exercise": "exercise",
        "homework": "homework",
        "resource": "pdf",
    }
    return mapping.get(section_type, "resource")


def _build_item_content_text(section_type: str, data: dict) -> str | None:
    if section_type == "dialogue":
        return _none_if_empty(data.get("transcript"))

    if section_type == "article":
        return _none_if_empty(data.get("text"))

    if section_type == "vocabulary":
        lines = [
            " | ".join(
                [
                    str(item.get("word", "")).strip(),
                    str(item.get("reading", "")).strip(),
                    str(item.get("meaning", "")).strip(),
                    str(item.get("example", "")).strip(),
                ]
            ).strip()
            for item in data.get("items", [])
        ]
        return _join_non_empty_lines(lines)

    if section_type == "grammar":
        lines = []
        for point in data.get("points", []):
            examples = ";".join(str(example).strip() for example in point.get("examples", []) if str(example).strip())
            lines.append(
                " | ".join(
                    [
                        str(point.get("pattern", "")).strip(),
                        str(point.get("meaning", "")).strip(),
                        examples,
                    ]
                ).strip()
            )
        return _join_non_empty_lines(lines)

    if section_type == "expression":
        expressions = [str(item.get("text", "")).strip() for item in data.get("expressions", [])]
        return _join_non_empty_lines(expressions)

    if section_type == "exercise":
        return _none_if_empty(data.get("prompt"))

    if section_type == "homework":
        lines = [
            " | ".join(
                [
                    str(task.get("title", "")).strip(),
                    str(task.get("description", "")).strip(),
                ]
            ).strip()
            for task in data.get("tasks", [])
        ]
        return _join_non_empty_lines(lines)

    if section_type == "resource":
        items = data.get("items", [])
        if items:
            first_item = items[0]
            return _none_if_empty(first_item.get("description"))
        return None

    return None


def _none_if_empty(value: object) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _join_non_empty_lines(lines: list[str]) -> str | None:
    cleaned = [line for line in lines if line.strip()]
    if not cleaned:
        return None
    return "\n".join(cleaned)


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
