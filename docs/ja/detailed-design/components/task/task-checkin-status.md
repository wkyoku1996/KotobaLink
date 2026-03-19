# タスク 打刻状態

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-TASK-003` |
| 実装元 | `pages/tab/task/index.wxml` / `index.js` |
| 関連イベント | `completeTask` / `goHomework` |
| 関連 state | `dailyTaskCompleted` / `learnedVocabIds` |

## 責務

このコンポーネントは、当日の詞汇学習進度、连续打卡値、完了通知、および打卡操作をまとめて管理します。タスクページの成果確認と書込操作の中心です。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| 学习进度 | `learnedCount / vocab.length` | `string` | 完了率表示 |
| 连续打卡 | `currentStreak` | `number` | 継続日数表示 |
| 完了通知 | `dailyTaskCompleted` | `boolean` | 完了後メッセージ表示 |
| 主按钮文言 | `demo.dailyTask.buttonText` | `string` | 操作案内 |

## frontend 操作項目表

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 主按钮 | `completeTask` | 条件成立時に `dailyTaskCompleted=true` |
| 次按钮 | `goHomework` | 宿題ページへ遷移 |

## backend データ要求

主な backend エンティティ:
- `DailyTask`
- `DailyTaskProgress`
- `StudentCheckin`
- `VocabularyProgress`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 当日タスク状態取得 | `GET` | `/api/v1/students/{studentId}/daily-tasks/today` |
| 打刻完了 | `POST` | `/api/v1/students/{studentId}/daily-tasks/{taskId}/complete` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `learnedCount` | `task.learnedCount` |
| `vocab.length` | `task.totalCount` |
| `currentStreak` | `task.currentStreak` |
| `dailyTaskCompleted` | `task.isCompleted` |
| `buttonText` | `task.actionLabel` |

## 書込 / 更新 API

| 操作 | Method | Path | body |
| --- | --- | --- | --- |
| 打刻完了 | `POST` | `/api/v1/students/{studentId}/daily-tasks/{taskId}/complete` | なし |
