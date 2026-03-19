# メッセージ Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MSG-001` |
| 実装元 | `pages/tab/messages/index.wxml` |
| 直接依存 service | `getMessagesData()` |

## 責務

メッセージページの冒頭で、メッセージ入口の用途と未読件数 / 重要件数を要約表示します。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | 固定文言 | `string` |
| 副題 | 固定文言 | `string` |
| 未读件数 | `messageData.unreadCount` | `number` |
| 重要件数 | `messageData.importantCount` | `number` |
