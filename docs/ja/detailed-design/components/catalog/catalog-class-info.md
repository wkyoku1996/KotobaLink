# コース詳細 クラス基本情報

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-004` |
| 実装元 | `pages/catalog/course-detail/index.wxml` |

## 責務
対象コースに紐づくクラス枠の基本情報を一覧表示します。

## backend データ要求
主な backend エンティティ: `Class`, `CourseOffering`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| コース詳細取得 | `GET` | `/api/v1/course-catalog/{courseId}` |
