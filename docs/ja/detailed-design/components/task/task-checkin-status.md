# 任务 打卡状态

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-TASK-003` |
| 実装元 | `pages/tab/task/index.wxml` / `index.js` |
| 直接依存 service | `getDemoData()` / `setDemoState()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| 学习进度 | `learnedCount / vocab.length` | `string` | `3/5` | 完了率表示 |
| 连续打卡 | `currentStreak` | `number` | `12` | streak 表示 |
| notice | `demo.state.dailyTaskCompleted` | `boolean` | `true` | 完了通知表示 |
| 主按钮文言 | `demo.dailyTask.buttonText` | `string` | `完成今日打卡` | 操作提示 |

## 操作項目表
| 操作対象 | 表示 | 発火条件 | 無効条件 | イベント | 処理 |
| --- | --- | --- | --- | --- | --- |
| 主按钮 | `demo.dailyTask.buttonText` | 常時 | `demo.state.dailyTaskCompleted` | `completeTask` | `dailyTaskCompleted=true` |
| 次按钮 | `查看作业` | 常時 | なし | `goHomework` | 宿題頁遷移 |

## 状態連動表
| 関連 state | 更新元 | 影響 |
| --- | --- | --- |
| `dailyTaskCompleted` | `completeTask` | notice / button disabled 更新 |
| `learnedVocabIds` | `markWordLearned` | `allLearned` 判定更新 |
