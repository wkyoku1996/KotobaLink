# 消息 列表

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-MSG-003` |
| 実装元 | `pages/tab/messages/index.wxml` / `index.js` |
| 直接依存 service | `getMessagesData()` / `setDemoState()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 类型 | `item.type` | `string` | `任务提醒` |
| 时间 | `item.time` | `string` | `2026-03-17 09:20` |
| 重要标签 | `item.important` | `boolean` | `true` |
| 已读状态 | `item.read` | `boolean` | `false` |
| 标题 | `item.title` | `string` | `本周五将进行阶段口语小考...` |
| 发送者 | `item.sender` | `string` | `学习系统` |
| 摘要 | `item.summary` | `string` | `提前复习本周会话表达...` |
| 标签组 | `item.tags` | `Array` | `['重要','考试']` |

## 操作項目表
| 操作対象 | 表示 | イベント | 処理 |
| --- | --- | --- | --- |
| 一覧項目 | message card | `openMessage` | 既読更新、详情弹层起動 |

## 状態連動表
| 関連 state | 更新元 | 影響 |
| --- | --- | --- |
| `readNotificationIds` | `openMessage` | 未读数、列表状态、详情状态 |
