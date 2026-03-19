# メッセージ Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MSG-001` |
| 実装元 | `pages/tab/messages/index.wxml` |

## 責務
メッセージ入口の用途と未読/重要件数を要約表示します。

## backend データ要求
主な backend エンティティ: `Notification`, `NotificationReadReceipt`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 通知要約取得 | `GET` | `/api/v1/students/{studentId}/notifications/summary` |
