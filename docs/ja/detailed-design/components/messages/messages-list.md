# メッセージ 一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MSG-003` |
| 実装元 | `pages/tab/messages/index.wxml` / `index.js` |
| 直接依存 service | `getMessagesData()` / `getDemoState()` / `setDemoState()` |
| 関連イベント | `openMessage` |
| 関連 state | `readNotificationIds` / `activeMessage` / `showMessageDetail` |

## 責務

このコンポーネントは、現在のフィルタ条件に一致するメッセージカードを一覧表示し、押下時に既読状態を更新して詳細モーダルを起動します。

一覧表示と既読反映の両方を担当するため、単なる見た目のリストではなく、メッセージ閲覧フローの起点です。

## 表示構造

1. 类型 / 时间 / 重要 / 已读状态の上段
2. 标题
3. 发送者
4. 摘要
5. 标签组
6. `点击查看详情` ヒント

## 表示フィールド表

| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| 类型 | `item.type` | `string` | `任务提醒` | 消息種別表示 |
| 时间 | `item.time` | `string` | `2026-03-17 09:20` | 発信時刻表示 |
| 重要标签 | `item.important` | `boolean` | `true` | 重要通知の強調表示 |
| 已读状态 | `item.read` | `boolean` | `false` | 既読/未読表示 |
| 标题 | `item.title` | `string` | `本周五将进行阶段口语小考...` | 件名表示 |
| 发送者 | `item.sender` | `string` | `学习系统` | 送信元表示 |
| 摘要 | `item.summary` | `string` | `提前复习本周会话表达...` | 内容要約 |
| 标签组 | `item.tags` | `Array<string>` | `['重要','考试']` | 補助分類表示 |

## 操作項目表

| 操作対象 | イベント | 発火条件 | 処理 |
| --- | --- | --- | --- |
| 一覧項目 | `openMessage` | 行押下時 | 未読なら `readNotificationIds` 更新、`activeMessage` 設定、モーダル表示 |

## 状態連動表

| 関連 state | 更新元 | 影響 |
| --- | --- | --- |
| `readNotificationIds` | `openMessage` | 未読数、一覧の読了表示、詳細表示に影響 |
| `activeMessage` | `openMessage` / `closeMessageDetail` | 詳細モーダル表示対象を制御 |
| `showMessageDetail` | `openMessage` / `closeMessageDetail` | モーダル開閉を制御 |
