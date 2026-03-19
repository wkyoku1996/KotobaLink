# Assessment 题目列表

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-ASSESS-003` |
| 実装元 | `pages/learning/assessment-detail/index.wxml` / `index.js` |

| 表示名 | キー | 型 |
| --- | --- | --- |
| 题目数组 | `assessment.questions[]` | `Array<object>` |
| 作答状态 | `answers` | `object` |
| 结果 | `result` | `object|null` |

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 选项 | `selectOption` | 答案更新 |
| 填空 | `inputBlank` | 文本更新 |
| 提交按钮 | `submitAssessment` | 正答数计算 |
| 重置按钮 | `resetAssessment` | 结果清空 |
