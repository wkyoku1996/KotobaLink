# 受講中コース クラス基本情報

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ENROLLED-003` |
| 実装元 | `pages/account/profile-course-detail/index.wxml` |

## 責務
受講中クラスに関する基本属性を表示します。

## backend データ要求
主な backend エンティティ: `EnrollmentClass`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 受講中コース詳細取得 | `GET` | `/api/v1/students/{studentId}/enrollments/{enrollmentId}` |
