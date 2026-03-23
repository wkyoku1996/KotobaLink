from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from app.db.dependencies import get_db_session
from app.modules.materials.schemas import (
    MaterialAssetsResponse,
    MaterialAssetUploadResponse,
    MaterialDetailResponse,
    MaterialJsonV2ExportResponse,
    MaterialLibraryResponse,
    MaterialPublishResponse,
    MaterialUnitDetailResponse,
    MaterialUnitsResponse,
)
from app.modules.materials.service import (
    export_material_json_v2,
    get_material_detail,
    get_material_unit_detail,
    list_material_assets,
    list_material_publish_records,
    list_material_units,
    list_materials,
    upload_material_asset,
)


router = APIRouter(prefix="/materials", tags=["materials"])


@router.get("/library", response_model=MaterialLibraryResponse)
def read_material_library(session: Session = Depends(get_db_session)) -> MaterialLibraryResponse:
    return MaterialLibraryResponse(data=list_materials(session))


@router.get("/library/{material_id}", response_model=MaterialDetailResponse)
def read_material_detail(material_id: str, session: Session = Depends(get_db_session)) -> MaterialDetailResponse:
    return MaterialDetailResponse(data=get_material_detail(session, material_id))


@router.get("/library/{material_id}/json", response_model=MaterialJsonV2ExportResponse)
def export_material_json_document(
    material_id: str,
    session: Session = Depends(get_db_session),
) -> MaterialJsonV2ExportResponse:
    return MaterialJsonV2ExportResponse(data=export_material_json_v2(session, material_id))


@router.get("/units", response_model=MaterialUnitsResponse)
def read_material_units(session: Session = Depends(get_db_session)) -> MaterialUnitsResponse:
    return MaterialUnitsResponse(data=list_material_units(session))


@router.get("/units/{unit_id}", response_model=MaterialUnitDetailResponse)
def read_material_unit_detail(unit_id: str, session: Session = Depends(get_db_session)) -> MaterialUnitDetailResponse:
    return MaterialUnitDetailResponse(data=get_material_unit_detail(session, unit_id))


@router.get("/assets", response_model=MaterialAssetsResponse)
def read_material_assets(session: Session = Depends(get_db_session)) -> MaterialAssetsResponse:
    return MaterialAssetsResponse(data=list_material_assets(session))


@router.post("/assets", response_model=MaterialAssetUploadResponse)
def create_material_asset(
    file: UploadFile = File(...),
    asset_type: str = Form(...),
    visibility: str = Form("teacher"),
    uploaded_by: str | None = Form(None),
    unit_id: str | None = Form(None),
    item_type: str | None = Form(None),
    item_title: str | None = Form(None),
    content_text: str | None = Form(None),
    session: Session = Depends(get_db_session),
) -> MaterialAssetUploadResponse:
    return MaterialAssetUploadResponse(
        data=upload_material_asset(
            session=session,
            file=file,
            asset_type=asset_type,
            visibility=visibility,
            uploaded_by=uploaded_by,
            unit_id=unit_id,
            item_type=item_type,
            item_title=item_title,
            content_text=content_text,
        )
    )


@router.get("/publish", response_model=MaterialPublishResponse)
def read_material_publish_records(session: Session = Depends(get_db_session)) -> MaterialPublishResponse:
    return MaterialPublishResponse(data=list_material_publish_records(session))
