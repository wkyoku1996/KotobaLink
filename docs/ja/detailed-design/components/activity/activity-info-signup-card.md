# 活动 信息与报名卡

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-ACTIVITY-002` |
| 実装元 | `pages/engagement/activity/index.wxml` / `index.js` |
| 直接依存 service | `getDemoData()` / `setDemoState()` |

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 类型 | `demo.activity.type` | `string` | `公开活动` |
| 时间 | `demo.activity.time` | `string` | `3/20 14:00` |
| 地点 | `demo.activity.location` | `string` | `东京池袋交流空间` |
| 费用 / 状态 | `demo.activity.fee` / `status` | `string` | `¥99 · 可报名` |

| 操作対象 | 表示 | イベント | 処理 |
| --- | --- | --- | --- |
| 主按钮 | `立即报名` / `取消报名` | `toggleSignup` | `activitySignedUp` 切替 |
| 次按钮 | `查看课表` | `goSchedule` | 课表頁遷移 |
