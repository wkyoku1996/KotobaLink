# ホーム Daily Task

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-HOME-005` |
| 実装元 | `pages/tab/home/index.wxml` / `index.js` |
| 関連イベント | タスクページ遷移イベント |

## 責務
ホームで当日タスクの完了状況を要約表示し、タスクページへの入口を提供します。

## backend データ要求
主な backend エンティティ: `DailyTask`, `DailyTaskProgress`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| ホーム用当日タスク要約取得 | `GET` | `/api/v1/students/{studentId}/home/daily-task-summary` |

## API フィールド対応表
| 画面フィールド | 想定 response フィールド |
| --- | --- |
| 完了状態 | `task.isCompleted` |
| 学習件数 | `task.learnedCount` |
| 合計件数 | `task.totalCount` |
