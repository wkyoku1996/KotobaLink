# Lesson 课后练习

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-LESSON-006` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` / `index.js` |

| 表示名 | キー | 型 |
| --- | --- | --- |
| 练习标题 | `lesson.practice.quizTitle / examTitle` | `string` |
| 题目 | `lesson.practice.questions[]` | `Array<object>` |
| 答案状态 | `practiceAnswers` | `object` |
| 结果 | `practiceResult` | `object|null` |

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 选项 | `selectOption` | 选择答案更新 |
| 填空 | `inputBlank` | 文本更新 |
| 提交按钮 | `submitPractice` | 正答数计算 |
| 重置按钮 | `resetPractice` | 结果清空 |
