# マイページ 学習アーカイブ

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-002` |
| 実装元 | `pages/tab/profile/index.wxml` |

## 責務
課時完了と宿題完了のサマリーを 2 枚カードで表示します。

## backend データ要求
主な backend エンティティ: `LessonProgress`, `HomeworkSubmission`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 学習アーカイブ要約取得 | `GET` | `/api/v1/students/{studentId}/profile/archive-summary` |
