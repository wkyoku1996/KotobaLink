# コース詳細 現在レッスンカード

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-002` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |

## 責務
スケジュール経由で入った場合に、遷移元のレッスン情報を補助表示します。

## backend データ要求
主な backend エンティティ: `ScheduleSession`, `Lesson`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 単一スケジュールセッション取得 | `GET` | `/api/v1/students/{studentId}/schedule/sessions/{sessionId}` |
