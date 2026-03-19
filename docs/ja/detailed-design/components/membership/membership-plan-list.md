# 会員 プラン一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MEMBER-003` |
| 実装元 | `pages/account/membership/index.wxml` |
| 直接依存 service | `getDemoData()` |
| データ源 | `demo.membershipPlans` |

## 責務

このコンポーネントは、upgrade 可能な会員方案を一覧表示します。現時点では購買ボタンを持たず、名称、価格、周期、权益说明の表示に限定されます。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| 方案名 | `item.name` | `string` | プラン識別 |
| 价格 | `item.price` | `string` | 料金表示 |
| 周期 | `item.duration` | `string` | 有効期間表示 |
| 权益说明 | `item.benefits` | `string` | プラン差分説明 |
