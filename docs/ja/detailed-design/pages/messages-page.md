# 消息ページ設計

## 基本情報

| 項目 | 内容 |
| --- | --- |
| ページ ID | `PAGE-MSG-001` |
| ページ名 | 消息 |
| 実装パス | `apps/miniapp/pages/tab/messages/` |
| 主要データ入口 | `getMessagesData()` / `getDemoState()` / `setDemoState()` |

## 控件構成

| 表示順 | 控件 ID | 控件名 | 役割 |
| --- | --- | --- | --- |
| 1 | `CMP-MSG-001` | 消息 Hero Summary | 未读・重要件数要約 |
| 2 | `CMP-MSG-002` | 消息 分类筛选 | 分类切替 |
| 3 | `CMP-MSG-003` | 消息 列表 | 消息一覧表示と详情起点 |
| 4 | `CMP-MSG-004` | 消息 详情弹层 | 既読後の详情表示 |
| 5 | `CMP-SHARED-003` | Accessibility Controls | 共通操作 |
