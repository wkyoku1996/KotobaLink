export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8000/api/v1';
export const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_BASE_URL?.trim() || 'http://localhost:8000';

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status}`;

    try {
      const payload = (await response.json()) as { detail?: string };
      if (payload.detail) {
        errorMessage = payload.detail;
      }
    } catch {
      // Ignore JSON parse issues and keep the generic error message.
    }

    throw new Error(errorMessage);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;
  return payload.data;
}

export type AuthUser = {
  id: string;
  username: string;
  display_name: string;
  role: string;
};

export function getRoleLabel(role: string) {
  switch (role) {
    case 'super_admin':
      return '超级管理员';
    case 'ops_admin':
      return '运营 / 教务';
    case 'teacher':
      return '教师';
    default:
      return role;
  }
}

export type LoginResult = {
  access_token: string;
  token_type: string;
  user: AuthUser;
};

export type StudentProfile = {
  id: string;
  name: string;
  level: string;
  current_course: string;
  membership_status: string;
};

export type CourseItem = {
  id: string;
  name: string;
  teacher: string;
  status: string;
  price: number;
};

export type StudentCourseItem = {
  id: string;
  course_id: string;
  course_name: string;
  class_name: string | null;
  teacher: string | null;
  classroom: string | null;
  service_status: string;
  lesson_progress: number;
};

export type OrderItem = {
  id: string;
  business_type: string;
  target_name: string;
  payment_status: string;
  amount: number;
};

export type MaterialLibraryItem = {
  id: string;
  title: string;
  series: string;
  level: string;
  language: string;
  version: string;
  status: string;
  unit_count: number;
  resource_count: number;
};

export type MaterialDetailUnitItem = {
  id: string;
  title: string;
  code: string | null;
  status: string;
  sort_order: number;
  item_count: number;
};

export type MaterialDetailItem = {
  id: string;
  title: string;
  series: string;
  level: string;
  language: string;
  version: string;
  summary: string | null;
  status: string;
  visibility: string;
  unit_count: number;
  resource_count: number;
  units: MaterialDetailUnitItem[];
};

export type MaterialUnitItem = {
  id: string;
  material_id: string;
  material_title: string;
  title: string;
  code: string | null;
  learning_goal: string | null;
  status: string;
  sort_order: number;
  content_types: string[];
  resource_count: number;
};

export type MaterialAssetItem = {
  id: string;
  file_name: string | null;
  asset_type: string | null;
  mime_type: string | null;
  file_size: number | null;
  duration_seconds: number | null;
  file_url: string | null;
};

export type MaterialUnitContentItem = {
  id: string;
  title: string;
  item_type: string;
  visibility: string;
  required: boolean;
  content_text: string | null;
  asset: MaterialAssetItem | null;
};

export type MaterialUnitDetailItem = {
  id: string;
  material_id: string;
  material_title: string;
  title: string;
  code: string | null;
  learning_goal: string | null;
  status: string;
  sort_order: number;
  content_types: string[];
  resource_count: number;
  items: MaterialUnitContentItem[];
};

export type MaterialAssetListItem = {
  id: string;
  file_name: string;
  asset_type: string;
  mime_type: string;
  file_size: number;
  duration_seconds: number | null;
  visibility: string;
  uploaded_by: string | null;
  file_url: string;
};

export type MaterialPublishListItem = {
  id: string;
  material_id: string;
  material_title: string;
  version: string;
  publish_scope: string;
  status: string;
  note: string | null;
  published_by: string | null;
};

export type MaterialJsonV2AssetMeta = {
  file_size: number | null;
  duration_seconds: number | null;
};

export type MaterialJsonV2Asset = {
  id: string;
  file_name: string;
  asset_type: string;
  mime_type: string;
  storage_key: string;
  file_url: string;
  visibility: string;
  meta: MaterialJsonV2AssetMeta;
};

export type MaterialJsonV2Section = {
  id: string;
  type: string;
  title: string;
  sort_order: number;
  enabled: boolean;
  content: Record<string, unknown>;
};

export type MaterialJsonV2Unit = {
  id: string;
  title: string;
  code: string | null;
  sort_order: number;
  status: string;
  learning_goal: string | null;
  can_do: string[];
  teacher_notes: string[];
  sections: MaterialJsonV2Section[];
};

export type MaterialJsonV2Metadata = {
  publisher: string | null;
  authors: string[];
  recommended_age: string | null;
  estimated_unit_duration_minutes: number | null;
};

export type MaterialJsonV2Publish = {
  version: string;
  status: string;
  scope: string;
  note: string | null;
};

export type MaterialJsonV2Document = {
  schema_version: string;
  id: string;
  title: string;
  series: string;
  level: string;
  language: string;
  version: string;
  summary: string | null;
  status: string;
  visibility: string;
  tags: string[];
  cover_asset_ref: string | null;
  course_refs: string[];
  metadata: MaterialJsonV2Metadata;
  units: MaterialJsonV2Unit[];
  assets: MaterialJsonV2Asset[];
  publish: MaterialJsonV2Publish;
};

export type PackageTemplateResourceMeta = {
  file_size: number | null;
  duration_seconds: number | null;
};

export type PackageTemplateResource = {
  id: string;
  file_name: string;
  resource_type: string;
  mime_type: string;
  storage_key: string;
  file_url: string;
  visibility: string;
  meta: PackageTemplateResourceMeta;
};

export type PackageTemplateContent = {
  id: string;
  type: string;
  title: string;
  sort_order: number;
  enabled: boolean;
  data: Record<string, unknown>;
  resources: PackageTemplateResource[];
};

export type PackageTemplateUnit = {
  id: string;
  title: string;
  code: string | null;
  sort_order: number;
  status: string;
  learning_goal: string | null;
  contents: PackageTemplateContent[];
};

export type PackageTemplateCourse = {
  id: string;
  title: string;
  status: string;
  summary: string | null;
  units: PackageTemplateUnit[];
};

export type PackageTemplateDocument = {
  schema_version: string;
  id: string;
  title: string;
  series: string;
  level: string;
  language: string;
  version: string;
  summary: string | null;
  status: string;
  visibility: string;
  tags: string[];
  courses: PackageTemplateCourse[];
};

export type PackageTemplateDeleteResult = {
  id: string;
  deleted: boolean;
};

export type PackageTemplateSaveResult = {
  template: PackageTemplateDocument;
  created_release: MaterialReleaseVersionDetail;
};

export type MaterialReleaseVersionItem = {
  id: string;
  material_id: string;
  material_title: string;
  version_number: string;
  status: string;
  note: string | null;
  published_by: string | null;
  published_at: string | null;
  is_live: boolean;
};

export type MaterialReleaseVersionDetail = MaterialReleaseVersionItem & {
  snapshot_json: Record<string, unknown>;
};

export type MaterialReleaseDeleteResult = {
  id: string;
  deleted: boolean;
};

export function loginAdmin(username: string, password: string) {
  return request<LoginResult>('/auth/login', {
    method: 'POST',
    body: { username, password },
  });
}

export function fetchCurrentUser(token: string) {
  return request<AuthUser>('/auth/me', { token });
}

export function logoutAdmin() {
  return request<{ message: string }>('/auth/logout', { method: 'POST' });
}

export function fetchStudentProfile() {
  return request<StudentProfile>('/students/profile');
}

export function fetchCourses() {
  return request<CourseItem[]>('/courses/catalog');
}

export function fetchStudentCourses() {
  return request<StudentCourseItem[]>('/students/courses');
}

export function fetchOrders() {
  return request<OrderItem[]>('/orders');
}

export function fetchMaterialLibrary() {
  return request<MaterialLibraryItem[]>('/materials/library');
}

export function fetchMaterialDetail(materialId: string) {
  return request<MaterialDetailItem>(`/materials/library/${materialId}`);
}

export function fetchMaterialJsonDocument(materialId: string) {
  return request<MaterialJsonV2Document>(`/materials/library/${materialId}/json`);
}

export function getMaterialJsonExportUrl(materialId: string) {
  return `${API_BASE_URL}/materials/library/${materialId}/json`;
}

export function fetchPackageTemplate(materialId: string) {
  return request<PackageTemplateDocument>(`/materials/library/${materialId}/template`);
}

export function savePackageTemplate(materialId: string, template: PackageTemplateDocument) {
  return request<PackageTemplateSaveResult>(`/materials/library/${materialId}/template`, {
    method: 'PUT',
    body: template,
  });
}

export function getPackageTemplateExportUrl(materialId: string) {
  return `${API_BASE_URL}/materials/library/${materialId}/template`;
}

export function createPackageTemplate(template: PackageTemplateDocument) {
  return request<PackageTemplateDocument>('/materials/library/template', {
    method: 'POST',
    body: template,
  });
}

export function deletePackageTemplate(materialId: string) {
  return request<PackageTemplateDeleteResult>(`/materials/library/${materialId}/template`, {
    method: 'DELETE',
  });
}

export function fetchMaterialReleaseVersions(materialId: string) {
  return request<MaterialReleaseVersionItem[]>(`/materials/library/${materialId}/releases`);
}

export function fetchMaterialReleaseVersionDetail(materialId: string, releaseId: string) {
  return request<MaterialReleaseVersionDetail>(`/materials/library/${materialId}/releases/${releaseId}`);
}

export function createMaterialReleaseVersion(
  materialId: string,
  payload: { note?: string | null; published_by?: string | null },
) {
  return request<MaterialReleaseVersionDetail>(`/materials/library/${materialId}/releases`, {
    method: 'POST',
    body: payload,
  });
}

export function goLiveMaterialReleaseVersion(materialId: string, releaseId: string) {
  return request<MaterialReleaseVersionDetail>(
    `/materials/library/${materialId}/releases/${releaseId}/go-live`,
    {
      method: 'POST',
      body: {},
    },
  );
}

export function archiveMaterialReleaseVersion(materialId: string, releaseId: string) {
  return request<MaterialReleaseVersionDetail>(
    `/materials/library/${materialId}/releases/${releaseId}/archive`,
    {
      method: 'POST',
      body: {},
    },
  );
}

export function deleteMaterialReleaseVersion(materialId: string, releaseId: string) {
  return request<MaterialReleaseDeleteResult>(`/materials/library/${materialId}/releases/${releaseId}`, {
    method: 'DELETE',
  });
}

export function restoreMaterialReleaseVersion(materialId: string, releaseId: string) {
  return request<PackageTemplateSaveResult>(
    `/materials/library/${materialId}/releases/${releaseId}/restore`,
    {
      method: 'POST',
      body: {},
    },
  );
}

export function fetchMaterialUnits() {
  return request<MaterialUnitItem[]>('/materials/units');
}

export function fetchMaterialUnitDetail(unitId: string) {
  return request<MaterialUnitDetailItem>(`/materials/units/${unitId}`);
}

export function fetchMaterialAssets() {
  return request<MaterialAssetListItem[]>('/materials/assets');
}

export function fetchMaterialPublishRecords() {
  return request<MaterialPublishListItem[]>('/materials/publish');
}

export type UploadMaterialAssetInput = {
  file: File;
  asset_type: string;
  visibility?: string;
  uploaded_by?: string;
  unit_id?: string;
  item_type?: string;
  item_title?: string;
  content_text?: string;
};

export async function uploadMaterialAsset(input: UploadMaterialAssetInput) {
  const formData = new FormData();
  formData.append('file', input.file);
  formData.append('asset_type', input.asset_type);
  formData.append('visibility', input.visibility ?? 'teacher');
  if (input.uploaded_by) formData.append('uploaded_by', input.uploaded_by);
  if (input.unit_id) formData.append('unit_id', input.unit_id);
  if (input.item_type) formData.append('item_type', input.item_type);
  if (input.item_title) formData.append('item_title', input.item_title);
  if (input.content_text) formData.append('content_text', input.content_text);

  const response = await fetch(`${API_BASE_URL}/materials/assets`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status}`;

    try {
      const payload = (await response.json()) as { detail?: string };
      if (payload.detail) {
        errorMessage = payload.detail;
      }
    } catch {
      // Ignore JSON parse issues and keep the generic error message.
    }

    throw new Error(errorMessage);
  }

  const payload = (await response.json()) as ApiEnvelope<{ asset: MaterialAssetListItem }>;
  return payload.data.asset;
}
