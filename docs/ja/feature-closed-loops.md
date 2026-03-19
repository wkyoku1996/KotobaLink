# 機能クローズドループ

## 文書範囲

本書は、現在の demo に存在する主要なクロスページループを一覧化するための索引です。

個別ボタン、フィールド、イベント、状態書き戻し位置は本書では重複記載せず、詳細設計文書を参照します。

## 現在のクローズドループ一覧

| ループ名 | 起点ページ | 終点ページ | 関係状態 | 関係ページ |
| --- | --- | --- | --- | --- |
| コース購入 | `pages/tab/course/index` | `pages/commerce/payment/index` | `purchasedCourseIds`、`lastPurchasedCourseId` | `pages/catalog/course-detail/index` |
| イベント申込 | `pages/tab/home/index` / `pages/learning/schedule/index` | `pages/engagement/activity/index` | `activitySignedUp` | `pages/learning/schedule/index`、`pages/tab/messages/index` |
| 毎日タスク | `pages/tab/task/index` | `pages/tab/task/index` | `learnedVocabIds`、`dailyTaskCompleted` | なし |
| 宿題提出 | `pages/tab/task/index` / `pages/learning/schedule/index` | `pages/learning/homework/index` | `homeworkSubmitted` | `pages/tab/profile/index` |
| メッセージ既読 | `pages/tab/messages/index` | `pages/tab/messages/index` | `readNotificationIds` | なし |
| スケジュールから Lesson 詳細 | `pages/learning/schedule/index` | `pages/learning/lesson-detail/index` | 専用書き戻し状態なし | なし |
| マイページから会員プラン | `pages/tab/profile/index` | `pages/account/membership/index` | 専用書き戻し状態なし | なし |

## 利用順序

1. 本書でループに関係するページと状態フィールドを確認する
2. [ページ一覧](./page-inventory.md) でページパスを確認する
3. 詳細設計のページ文書でコンポーネント構成を確認する
4. 個別コンポーネント文書で操作、イベント、状態書き戻し位置を確認する

## 関連文書

- [現在の Demo 機能](./demo-features.md)
- [データ構成](./data-architecture.md)
- [Demo から正式版への移行](./project-transition-plan.md)
- `docs/ja/detailed-design/`
