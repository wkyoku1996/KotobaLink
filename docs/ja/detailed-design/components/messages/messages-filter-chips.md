# メッセージ 分類フィルタ

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MSG-002` |
| 実装元 | `pages/tab/messages/index.wxml` / `index.js` |

## 責務
カテゴリごとにメッセージ一覧の表示対象を切り替えます。

## backend データ要求
主な backend エンティティ: `NotificationCategory`, `Notification`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| カテゴリ別件数取得 | `GET` | `/api/v1/students/{studentId}/notifications/summary` |
