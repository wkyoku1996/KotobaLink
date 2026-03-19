# メッセージ 詳細モーダル

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MSG-004` |
| 実装元 | `pages/tab/messages/index.wxml` / `index.js` |
| 関連イベント | `closeMessageDetail` |

## 責務
選択した通知の詳細内容をモーダル表示します。既読化自体は一覧側で行い、本モーダルは表示と閉鎖を担当します。

## backend データ要求
主な backend エンティティ: `Notification`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 単一通知詳細取得 | `GET` | `/api/v1/students/{studentId}/notifications/{notificationId}` |
