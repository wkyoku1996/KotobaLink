# コース詳細 Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-001` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |

## 責務
コース詳細ページの対象コースを識別するヘッダーです。タイトル、种别、受講期間、募集状態を表示します。

## backend データ要求
主な backend エンティティ: `Course`, `CourseOffering`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| コース詳細取得 | `GET` | `/api/v1/course-catalog/{courseId}` |
