# ページ一覧

## 文書範囲

本書は、現在の miniapp で登録されているページ、ページ分類、および詳細設計文書との対応関係のみを記載します。

ページ内コンポーネント、フィールド、ボタン、状態連動、データ入出力は本書では展開せず、詳細設計文書で管理します。

## 現在登録されているページ

| ページパス | ページ名 | 分類 | 主な役割 |
| --- | --- | --- | --- |
| `pages/tab/home/index` | ホーム | Tab | 学習概要、クイック導線 |
| `pages/tab/course/index` | コース | Tab | コース一覧、購入入口 |
| `pages/tab/task/index` | タスク | Tab | 毎日タスク、単語学習 |
| `pages/tab/messages/index` | メッセージ | Tab | メッセージ閲覧、分類切替 |
| `pages/tab/profile/index` | マイページ | Tab | 学習記録、成長表示 |
| `pages/learning/schedule/index` | スケジュール | 学習フロー | 週間予定、授業導線 |
| `pages/learning/homework/index` | 宿題 | 学習フロー | 宿題確認、提出 |
| `pages/learning/lesson-detail/index` | Lesson 詳細 | 学習フロー | 学習内容表示 |
| `pages/learning/assessment-detail/index` | Assessment 詳細 | 学習フロー | 試験情報、問題表示 |
| `pages/catalog/course-detail/index` | コース詳細 | コース | コース紹介、購入入口 |
| `pages/account/membership/index` | 会員プラン | アカウント | 会員特典、プラン表示 |
| `pages/account/profile-course-detail/index` | 受講中コース詳細 | アカウント | 受講中コース情報、Lesson / Assessment 導線 |
| `pages/engagement/activity/index` | イベント | イベント | イベント詳細、申込状態 |
| `pages/commerce/payment/index` | 決済完了 | 取引 | 注文結果、後続導線 |

## ページディレクトリ分類

| ディレクトリ | 内容 |
| --- | --- |
| `pages/tab/` | 主ナビゲーションページ |
| `pages/learning/` | 学習フローページ |
| `pages/catalog/` | コース紹介と購入ページ |
| `pages/account/` | アカウント関連ページ |
| `pages/engagement/` | イベント関連ページ |
| `pages/commerce/` | 決済と取引ページ |
| `pages/legacy/` | 現行フローで使用しない旧テンプレート |

## 詳細設計文書との対応

コンポーネント詳細設計は以下のディレクトリで管理します。

- `docs/ja/detailed-design/pages/`
- `docs/ja/detailed-design/components/`

利用順序:

1. 本書でページパスとページ分類を確認する
2. `docs/ja/detailed-design/pages/` でページ構成を確認する
3. 個別コンポーネント文書でフィールド、イベント、状態、データ入出力を確認する

## 登録対象外ページ

以下は現在の登録対象外です。

- `pages/legacy/index/*`
- `pages/legacy/logs/*`
