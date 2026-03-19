# ページ一覧

## 現在登録されているページ

現在のミニアプリでは `apps/miniapp/app.json` に以下のページが登録されています。

### タブページ

- `pages/tab/home/index`: ホーム概要とクイック入口
- `pages/tab/course/index`: 受講中コースと購入可能コース
- `pages/tab/task/index`: 学習タスク一覧
- `pages/tab/messages/index`: メッセージセンター
- `pages/tab/profile/index`: マイページ、学習記録、成長概要

### 学習フローページ

- `pages/learning/schedule/index`: 時間割と学習タイムライン
- `pages/learning/homework/index`: 宿題提出フロー
- `pages/learning/lesson-detail/index`: lesson 詳細
- `pages/learning/assessment-detail/index`: assessment 詳細

### コースとアカウントページ

- `pages/catalog/course-detail/index`: コース詳細
- `pages/account/membership/index`: 会員センター
- `pages/account/profile-course-detail/index`: 申込済みコース詳細

### イベントと取引ページ

- `pages/engagement/activity/index`: イベント詳細と申込フロー
- `pages/commerce/payment/index`: 支払い結果と後続入口

## ページ分類

現在のページディレクトリは業務ドメインごとに分かれています。

- `pages/tab/`: 主ナビゲーション
- `pages/learning/`: 学習過程
- `pages/catalog/`: コース発見とコース詳細
- `pages/account/`: アカウント関連
- `pages/engagement/`: イベント関連
- `pages/commerce/`: 支払いと取引
- `pages/legacy/`: 現行フローに含まれない旧テンプレート
