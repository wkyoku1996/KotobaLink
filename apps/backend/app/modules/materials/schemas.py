from pydantic import BaseModel

from app.common.schemas import ApiResponse


class MaterialLibraryItem(BaseModel):
    id: str
    title: str
    series: str
    level: str
    language: str
    version: str
    status: str
    unit_count: int
    resource_count: int


class MaterialDetailUnitItem(BaseModel):
    id: str
    title: str
    code: str | None
    status: str
    sort_order: int
    item_count: int


class MaterialDetailItem(BaseModel):
    id: str
    title: str
    series: str
    level: str
    language: str
    version: str
    summary: str | None
    status: str
    visibility: str
    unit_count: int
    resource_count: int
    units: list[MaterialDetailUnitItem]


class MaterialAssetItem(BaseModel):
    id: str
    file_name: str | None
    asset_type: str | None
    mime_type: str | None
    file_size: int | None
    duration_seconds: int | None
    file_url: str | None


class MaterialUnitContentItem(BaseModel):
    id: str
    title: str
    item_type: str
    visibility: str
    required: bool
    content_text: str | None
    asset: MaterialAssetItem | None


class MaterialUnitItem(BaseModel):
    id: str
    material_id: str
    material_title: str
    title: str
    code: str | None
    learning_goal: str | None
    status: str
    sort_order: int
    content_types: list[str]
    resource_count: int


class MaterialUnitDetailItem(BaseModel):
    id: str
    material_id: str
    material_title: str
    title: str
    code: str | None
    learning_goal: str | None
    status: str
    sort_order: int
    content_types: list[str]
    resource_count: int
    items: list[MaterialUnitContentItem]


class MaterialAssetListItem(BaseModel):
    id: str
    file_name: str
    asset_type: str
    mime_type: str
    file_size: int
    duration_seconds: int | None
    visibility: str
    uploaded_by: str | None
    file_url: str


class MaterialAssetUploadData(BaseModel):
    asset: MaterialAssetListItem


class MaterialAssetUploadResponse(ApiResponse):
    data: MaterialAssetUploadData


class MaterialPublishListItem(BaseModel):
    id: str
    material_id: str
    material_title: str
    version: str
    publish_scope: str
    status: str
    note: str | None
    published_by: str | None


class MaterialLibraryResponse(ApiResponse):
    data: list[MaterialLibraryItem]


class MaterialDetailResponse(ApiResponse):
    data: MaterialDetailItem


class MaterialUnitsResponse(ApiResponse):
    data: list[MaterialUnitItem]


class MaterialUnitDetailResponse(ApiResponse):
    data: MaterialUnitDetailItem


class MaterialAssetsResponse(ApiResponse):
    data: list[MaterialAssetListItem]


class MaterialPublishResponse(ApiResponse):
    data: list[MaterialPublishListItem]


class MaterialJsonV2AssetMeta(BaseModel):
    file_size: int | None
    duration_seconds: int | None


class MaterialJsonV2Asset(BaseModel):
    id: str
    file_name: str
    asset_type: str
    mime_type: str
    storage_key: str
    file_url: str
    visibility: str
    meta: MaterialJsonV2AssetMeta


class MaterialJsonV2Metadata(BaseModel):
    publisher: str | None
    authors: list[str]
    recommended_age: str | None
    estimated_unit_duration_minutes: int | None


class MaterialJsonV2Publish(BaseModel):
    version: str
    status: str
    scope: str
    note: str | None


class MaterialJsonV2Section(BaseModel):
    id: str
    type: str
    title: str
    sort_order: int
    enabled: bool
    content: dict


class MaterialJsonV2Unit(BaseModel):
    id: str
    title: str
    code: str | None
    sort_order: int
    status: str
    learning_goal: str | None
    can_do: list[str]
    teacher_notes: list[str]
    sections: list[MaterialJsonV2Section]


class MaterialJsonV2Document(BaseModel):
    schema_version: str
    id: str
    title: str
    series: str
    level: str
    language: str
    version: str
    summary: str | None
    status: str
    visibility: str
    tags: list[str]
    cover_asset_ref: str | None
    course_refs: list[str]
    metadata: MaterialJsonV2Metadata
    units: list[MaterialJsonV2Unit]
    assets: list[MaterialJsonV2Asset]
    publish: MaterialJsonV2Publish


class MaterialJsonV2ExportResponse(ApiResponse):
    data: MaterialJsonV2Document
