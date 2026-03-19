# タスク Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-TASK-001` |
| 実装元 | `pages/tab/task/index.wxml` |

## 責務
当日詞汇打卡ページのタイトルと導入説明を表示します。

## backend データ要求
主な backend エンティティ: `DailyTask`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 当日タスク要約取得 | `GET` | `/api/v1/students/{studentId}/daily-tasks/today` |
