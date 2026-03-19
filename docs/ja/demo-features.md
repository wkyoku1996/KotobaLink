# 現在の Demo 機能

## 文書範囲

本書は、現在の demo がカバーしている機能モジュール一覧のみを記載します。

モジュール内部のコンポーネント、フィールド、ボタン、状態連動、データ入出力は本書では重複記載せず、詳細設計文書を参照します。

## 現在の機能モジュール

| モジュール | 対応ページ | 現在の範囲 |
| --- | --- | --- |
| ホーム概要 | `pages/tab/home/index` | 受講生情報、コース要約、成長グラフ、クイック導線 |
| コース | `pages/tab/course/index`、`pages/catalog/course-detail/index`、`pages/account/profile-course-detail/index` | コース一覧、コース詳細、受講中コース詳細 |
| スケジュール | `pages/learning/schedule/index` | 週間予定、授業予定、イベント予定 |
| タスクと宿題 | `pages/tab/task/index`、`pages/learning/homework/index` | 単語学習、チェックイン、宿題提出 |
| メッセージ | `pages/tab/messages/index` | 分類フィルタ、詳細閲覧、既読状態 |
| マイページ | `pages/tab/profile/index`、`pages/account/membership/index` | 学習記録、成長表示、会員入口 |
| イベント | `pages/engagement/activity/index` | イベント詳細、申込状態 |
| 決済完了 | `pages/commerce/payment/index` | 直近注文結果、後続導線 |
| Lesson / Assessment 詳細 | `pages/learning/lesson-detail/index`、`pages/learning/assessment-detail/index` | 教材内容、設問内容、資料表示 |

## 状態連動に使用している主なローカル状態

| 状態フィールド | 役割 |
| --- | --- |
| `purchasedCourseIds` | 購入済みコースの識別 |
| `lastPurchasedCourseId` | 直近購入コースの識別 |
| `homeworkSubmitted` | 宿題提出状態 |
| `dailyTaskCompleted` | 毎日タスク完了状態 |
| `learnedVocabIds` | 学習済み単語の識別 |
| `readNotificationIds` | 既読メッセージの識別 |
| `activitySignedUp` | イベント申込状態 |

状態の保存先と読取経路は [データ構成](./data-architecture.md) を参照してください。

## 関連文書

- [ページ一覧](./page-inventory.md)
- [機能クローズドループ](./feature-closed-loops.md)
- [データ構成](./data-architecture.md)
- `docs/ja/detailed-design/`
