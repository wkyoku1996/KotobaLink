# イベント 情報・申込カード

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ACTIVITY-002` |
| 実装元 | `pages/engagement/activity/index.wxml` / `index.js` |
| 関連イベント | `toggleSignup` / `goSchedule` |
| 関連 state | `activitySignedUp` |

## 責務

このコンポーネントは、イベント基本情報の表示と、申込 / 取消、およびスケジュール画面への導線をまとめて扱います。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 类型 | `demo.activity.type` | `string` |
| 时间 | `demo.activity.time` | `string` |
| 地点 | `demo.activity.location` | `string` |
| 费用 / 状态 | `demo.activity.fee` / `demo.activity.status` | `string` |

## 操作項目表

| 操作対象 | イベント | 発火条件 | 処理 |
| --- | --- | --- | --- |
| 主按钮 | `toggleSignup` | 常時 | `activitySignedUp` を反転し toast 表示 |
| 辅助按钮 | `goSchedule` | `status === '已报名'` | スケジュール画面へ遷移 |
