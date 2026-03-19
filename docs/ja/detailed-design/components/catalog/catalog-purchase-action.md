# 课程详情 购买操作区

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-CATALOG-008` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |
| 直接依存 service | `setDemoState()` |

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 按钮文言 | `isPurchased` | `boolean` | `已在我的课程中` / `立即购买` |

| 操作対象 | イベント | 無効条件 | 処理 |
| --- | --- | --- | --- |
| 购买按钮 | `purchaseCourse` | `isPurchased === true` | 购买 state 更新、支付页遷移 |
