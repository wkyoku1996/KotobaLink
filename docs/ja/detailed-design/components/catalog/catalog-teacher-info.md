# コース詳細 講師基本情報

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-005` |
| 実装元 | `pages/catalog/course-detail/index.wxml` |

## 責務
講師の基本属性をラベル/値形式で一覧表示します。

## backend データ要求
主な backend エンティティ: `Teacher`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| コース詳細取得 | `GET` | `/api/v1/course-catalog/{courseId}` |
