# 支付 订单信息卡

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-PAYMENT-002` |
| 実装元 | `pages/commerce/payment/index.wxml` / `index.js` |

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 已购课程 | `demo.paymentOrder.courseName` | `string` | `N4 Grammar Intensive` |
| 班级 / 服务形态 | `className` | `string` | `Wednesday Evening Class` |
| 支付金额 | `price` | `string` | `JPY 32000` |
| 课程权益 | `benefit` | `string` | `includes homework feedback...` |
| 开通状态 | `serviceStatus` | `string` | `已开通` |

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 查看我的课表 | `goSchedule` | 课表頁遷移 |
