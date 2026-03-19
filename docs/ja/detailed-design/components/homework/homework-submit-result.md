# 作业 提交结果区

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-HOMEWORK-002` |
| 実装元 | `pages/learning/homework/index.wxml` / `index.js` |
| 直接依存 service | `setDemoState()` |

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 提交状态 | `demo.homeworkSubmitted` | `boolean` | `false` |
| 主按钮 | 固定文言 | `string` | `提交作业` |
| 成功提示 | 固定文言 | `string` | `作业已提交！` |

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 提交按钮 | `submitHomework` | `homeworkSubmitted=true` |
| 查看档案按钮 | `goProfile` | 我的頁へ切替 |
