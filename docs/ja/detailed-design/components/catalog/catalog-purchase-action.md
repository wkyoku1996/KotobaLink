# コース詳細 購入操作エリア

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-008` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |
| 直接依存 service | `getDemoData()` / `setDemoState()` |
| 関連 state | `isPurchased`、`purchasedCourseIds`、`lastPurchasedCourseId` |

## 責務

このコンポーネントは、コース詳細ページの最終操作領域として、対象コースが未購入であれば購入を実行し、購入済みであれば再購入を防止します。

購入処理自体は demo state の更新と決済完了ページへの遷移で構成され、実決済処理は実装していません。

## 表示フィールド表

| 表示名 | キー | 型 | 例 | 用途 | 状態差分 |
| --- | --- | --- | --- | --- | --- |
| ボタン文言 | `isPurchased` | `boolean` | `立即购买` / `已在我的课程中` | 操作可否を表示 | 購入済み時は文言切替 |

## frontend 操作項目表

| 操作対象 | イベント | 発火条件 | 無効条件 | 処理 | 遷移先 |
| --- | --- | --- | --- | --- | --- |
| 購入ボタン | `purchaseCourse` | `course` が存在 | `isPurchased === true` | state 更新後に決済完了へ遷移 | `/pages/commerce/payment/index?courseId=...` |

## frontend 状態更新表

| 更新キー | 更新内容 |
| --- | --- |
| `purchased` | `true` に設定 |
| `purchasedCourseIds` | 対象 `course.id` を配列へ追加 |
| `lastPurchasedCourseId` | 対象 `course.id` を設定 |
| `isPurchased` | ページローカル state を `true` に更新 |

## backend データ要求

このコンポーネントは demo では local state だけで購買完了を表現していますが、正式版ではコース購入可否判定、注文作成、支払手段確定、開通状態更新までを扱う backend / API が必要です。

backend 側で必要になる主なエンティティ:

- `Course`
- `Enrollment`
- `Order`
- `OrderItem`
- `Payment`
- `Student`

## 想定 API 一覧

| 用途 | Method | Path | 主な request |
| --- | --- | --- | --- |
| 購入可否確認 | `GET` | `/api/v1/students/{studentId}/courses/{courseId}/purchase-eligibility` | `studentId`, `courseId` |
| 注文作成 | `POST` | `/api/v1/students/{studentId}/orders` | `courseId`, `classId`, `pricingPlanId` |
| 支払情報取得 | `GET` | `/api/v1/orders/{orderId}` | `orderId` |
| 支払実行結果反映 | `POST` | `/api/v1/orders/{orderId}/payments/confirm` | `paymentChannel`, `transactionId` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド | 補足 |
| --- | --- | --- |
| `isPurchased` | `eligibility.alreadyEnrolled` | 購入ボタン disable 判定 |
| ボタン可否 | `eligibility.canPurchase` | 販売停止、対象外なども判定可能 |
| `course.id` | `course.id` | 注文作成キー |
| 支払結果画面の `courseName` | `order.items[0].courseName` | 決済完了ページ連携 |
| 支払結果画面の `serviceStatus` | `order.serviceStatus` | 開通状態表示 |

## 書込 / 更新 API

| 操作 | Method | Path | request body | 成功時の画面影響 |
| --- | --- | --- | --- | --- |
| 注文作成 | `POST` | `/api/v1/students/{studentId}/orders` | `courseId`, `classId`, `pricingPlanId` | 支払ページまたは支払導線へ進む |
| 支払確定 | `POST` | `/api/v1/orders/{orderId}/payments/confirm` | `paymentChannel`, `transactionId` | 受講状態更新、決済完了画面表示 |

## データ流入元 / 流出先

| 種別 | 内容 |
| --- | --- |
| 流入元 | `refresh()` 内 `getDemoData()`、`course` |
| 流出先 | `setDemoState()`、`payment` ページ遷移 |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `course` が未取得 | `purchaseCourse()` は return |
| 既に購入済み | ボタン disabled、再実行不可 |

## 実装メモまたは移行メモ

- demo では `purchasedCourseIds` と `lastPurchasedCourseId` で購買済み状態を表現
- 正式版では `Enrollment` と `Order` が source of truth になる
- 決済完了ページへ遷移する前に、注文作成 ID または支払結果 ID を保持する必要がある
