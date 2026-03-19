# 首页 Activity Entry

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-HOME-004` |
| 控件名 | 首页 Activity Entry |
| 実装元 | `pages/tab/home/index.wxml` |
| スタイル基底 | `CMP-SHARED-002` |
| 直接依存 service | `getDemoData()` |

## 責務

活動入口控件は、当前活动の要約情報を首页に表示し、活动详情頁への導線を提供します。

## 表示フィールド表

| 表示名 | キー | 型 | 例 | データ元 | 用途 |
| --- | --- | --- | --- | --- | --- |
| タイトル | 固定文言 `活动入口` | `string` | `活动入口` | WXML 固定 | セクション見出し |
| 活动标题 | `demo.activity.title` | `string` | `春季日语交流沙龙` | `getDemoData()` | 活动識別 |
| 活动时间 | `demo.activity.time` | `string` | `3/20 14:00` | `getDemoData()` | 開催時刻表示 |
| 活动状态 | `demo.activity.status` | `string` | `可报名` | `getDemoData()` | 申込状態表示 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 加工 | 用途 |
| --- | --- | --- | --- | --- | --- |
| `demo.activity.title` | `string` | はい | `getDemoData()` | なし | 活动識別 |
| `demo.activity.time` | `string` | はい | `getDemoData()` | なし | 時刻表示 |
| `demo.activity.status` | `string` | はい | `getDemoData()` | `buildDemoData()` が再計算 | 状態表示 |

## 操作項目表

| 操作対象 | 表示 | 発火条件 | 無効条件 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- | --- | --- | --- |
| CTA ボタン | `查看活动详情` | 常時 | なし | `goActivity` | `wx.navigateTo(...)` | `/pages/engagement/activity/index` |

## 出力イベント表

| イベント | 発火元 | 状態更新 | 影響先 |
| --- | --- | --- | --- |
| `goActivity` | CTA ボタン | なし | 活动详情頁 |

## 状態連動表

`demo.activity.status` は `activitySignedUp` に連動します。

| state | 表示値 | 影響 |
| --- | --- | --- |
| `false` | `可报名` | 未申込表示 |
| `true` | `已报名` | 申込済み表示 |

## データ流入元 / 流出先

| 種別 | 内容 |
| --- | --- |
| 直接流入元 | `services/demo-service.getDemoData()` |
| 中間加工 | `mock/demo-source.buildDemoData()` が `activity.status` を再計算 |
| 流出先 | `goActivity` により活动详情頁へ遷移 |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `demo.activity` が欠落 | 当前模板では控件自体が壊れるため、service 側でデータ保持が前提 |
| `status` が不正値 | 要約文にはそのまま表示される |

## 実 API 化時の置換

- `GET /activities`
- `GET /activities/:activityId`
- `GET /activities/:activityId/registration`
