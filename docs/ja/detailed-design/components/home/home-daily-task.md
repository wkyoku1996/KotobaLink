# 首页 Daily Task

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-HOME-005` |
| 控件名 | 首页 Daily Task |
| 実装元 | `pages/tab/home/index.wxml` |
| スタイル基底 | `CMP-SHARED-002` |
| 直接依存 service | `getDemoData()` |

## 責務

この控件は、今日任务の概要、连续完成数、当日完了状态を表示し、任务頁への導線を提供します。

## 表示フィールド表

| 表示名 | キー | 型 | 例 | データ元 | 用途 |
| --- | --- | --- | --- | --- | --- |
| タイトル | 固定文言 `今日任务` | `string` | `今日任务` | WXML 固定 | 見出し |
| 説明文 | `demo.dailyTask.intro` | `string` | `完成 5 个今日词汇学习后...` | `BASE_DATA.dailyTask.intro` | 任务説明 |
| 连续完成数 | `demo.dailyTask.currentStreak` | `number` | `13` | `buildDemoData()` | 連続記録表示 |
| 完了通知表示 | `demo.state.dailyTaskCompleted` | `boolean` | `true` | `store/demo-state` | notice 表示制御 |
| 完了通知文 | `demo.dailyTask.currentStreak` | `number` | `13` | `buildDemoData()` | notice 文中の数値表示 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 加工 | 用途 |
| --- | --- | --- | --- | --- | --- |
| `demo.dailyTask.intro` | `string` | はい | `getDemoData()` | なし | 説明文表示 |
| `demo.dailyTask.currentStreak` | `number` | はい | `buildDemoData()` | state に応じて再計算 | streak 表示 |
| `demo.state.dailyTaskCompleted` | `boolean` | はい | `getDemoData()` | なし | notice 表示制御 |

## 完了通知表示条件

`demo.state.dailyTaskCompleted === true` の場合のみ、以下の通知文を表示します。

`今日 5 个词汇已学习完成，已记为打卡成功，连续打卡 \{\{demo.dailyTask.currentStreak\}\} 天。`

## 操作項目表

| 操作対象 | 表示 | 発火条件 | 無効条件 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- | --- | --- | --- |
| CTA ボタン | `开始今日词汇` | 常時 | なし | `goTask` | `wx.switchTab(...)` | `/pages/tab/task/index` |

## 出力イベント表

| イベント | 発火元 | 更新状態 | 影響先 |
| --- | --- | --- | --- |
| `goTask` | CTA ボタン | なし | 任务頁遷移 |

## 状態計算表

`buildDemoData()` 内で以下を再計算します。

| 計算項目 | 計算式 | 用途 |
| --- | --- | --- |
| `learnedCount` | `state.learnedVocabIds.length` | 学習済み数保持 |
| `allLearned` | `learnedCount >= vocab.length` | 完了判定 |
| `currentStreak` | 完了時は `streak + 1`、未完了時は `streak` | streak 表示 |
| `buttonText` | 完了状態と語彙学習状態から生成 | 任务頁用ボタン文言 |

首页では `buttonText` 自体は表示していませんが、任务頁と同じ state を共有します。

## 状態連動表

| 関連 state | 現在の利用 | 更新元 | 影響先 |
| --- | --- | --- | --- |
| `dailyTaskCompleted` | notice 表示、streak 計算 | 任务頁 `completeTask` | 首页、任务頁 |
| `learnedVocabIds` | `learnedCount` / `allLearned` 計算 | 任务頁 `markWordLearned` | 首页、任务頁 |

## データ流入元 / 流出先

| 種別 | 内容 |
| --- | --- |
| 直接流入元 | `services/demo-service.getDemoData()` |
| 中間加工 | `mock/demo-source.buildDemoData()` |
| 流出先 | `goTask` により任务頁へ遷移 |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `dailyTaskCompleted = false` | notice 非表示 |
| `learnedVocabIds = []` | `currentStreak` は基準 streak のまま |

## 実 API 化時の置換

- `GET /tasks/daily`
- `POST /tasks/daily/vocab/:wordId/complete`
- `POST /tasks/daily/check-in`
