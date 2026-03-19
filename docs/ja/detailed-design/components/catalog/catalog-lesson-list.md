# コース詳細 レッスン一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-006` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |
| 関連イベント | `openLessonDetail` |

## 責務
コースに含まれる Lesson 一覧を表示し、Lesson 詳細への入口を提供します。

## backend データ要求
主な backend エンティティ: `Lesson`, `Course`, `Teacher`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| コース配下 Lesson 一覧取得 | `GET` | `/api/v1/course-catalog/{courseId}/lessons` |
