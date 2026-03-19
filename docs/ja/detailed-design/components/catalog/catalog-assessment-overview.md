# コース詳細 評価概要

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-007` |
| 実装元 | `pages/catalog/course-detail/index.wxml` |

## 責務
コース全体に紐づく考核構成の概要を表示します。

## backend データ要求
主な backend エンティティ: `AssessmentPlan`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| コース評価概要取得 | `GET` | `/api/v1/course-catalog/{courseId}/assessment-overview` |
