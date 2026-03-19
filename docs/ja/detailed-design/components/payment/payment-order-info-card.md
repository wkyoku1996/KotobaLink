# 決済完了 注文情報カード

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PAYMENT-002` |
| 実装元 | `pages/commerce/payment/index.wxml` / `index.js` |
| 関連イベント | `goSchedule` |
| データ源 | `demo.paymentOrder` / `demo.student` |

## 責務

このコンポーネントは、購入済みコース、班级 / 服务形态、支付金额、课程权益、开通状态を表示し、スケジュール画面への導線を提供します。

## 表示フィールド表

| 表示名 | キー | 型 | 表示条件 |
| --- | --- | --- | --- |
| 已购课程 | `demo.paymentOrder.courseName` | `string` | 常時 |
| 班级 / 服务形态 | `demo.paymentOrder.className` | `string` | 常時 |
| 支付金额 | `demo.paymentOrder.price` | `string` | `paymentOrder` 存在時 |
| 课程权益 | `demo.paymentOrder.benefit` | `string` | `paymentOrder` 存在時 |
| 开通状态 | `demo.paymentOrder.serviceStatus` | `string` | 常時 |

## 操作項目表

| 操作対象 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- |
| `查看我的课表` ボタン | `goSchedule` | スケジュールページへ遷移 | `/pages/learning/schedule/index` |
