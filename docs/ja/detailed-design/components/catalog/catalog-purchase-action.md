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

## 操作項目表

| 操作対象 | イベント | 発火条件 | 無効条件 | 処理 | 遷移先 |
| --- | --- | --- | --- | --- | --- |
| 購入ボタン | `purchaseCourse` | `course` が存在 | `isPurchased === true` | state 更新後に決済完了へ遷移 | `/pages/commerce/payment/index?courseId=...` |

## 状態更新表

| 更新キー | 更新内容 |
| --- | --- |
| `purchased` | `true` に設定 |
| `purchasedCourseIds` | 対象 `course.id` を配列へ追加 |
| `lastPurchasedCourseId` | 対象 `course.id` を設定 |
| `isPurchased` | ページローカル state を `true` に更新 |

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
