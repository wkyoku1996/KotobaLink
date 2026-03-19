# 任务ページ設計

## 基本情報

| 項目 | 内容 |
| --- | --- |
| ページ ID | `PAGE-TASK-001` |
| ページ名 | 任务 |
| 実装パス | `apps/miniapp/pages/tab/task/` |
| 主要データ入口 | `getDemoData()` / `setDemoState()` |

## 控件構成

| 表示順 | 控件 ID | 控件名 | 役割 |
| --- | --- | --- | --- |
| 1 | `CMP-TASK-001` | 任务 Hero Summary | 今日任务概要表示 |
| 2 | `CMP-TASK-002` | 任务 词汇列表 | 今日词汇一覧表示 |
| 3 | `CMP-TASK-003` | 任务 打卡状态 | 进度・连续打卡・CTA 表示 |
| 4 | `CMP-TASK-004` | 任务 词汇弹层 | 词汇详细表示と学習済み更新 |
| 5 | `CMP-SHARED-003` | Accessibility Controls | 共通操作 |
