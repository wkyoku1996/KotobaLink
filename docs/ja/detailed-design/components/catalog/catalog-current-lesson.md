# 课程详情 当前课次卡

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-CATALOG-002` |
| 実装元 | `pages/catalog/course-detail/index.wxml` |
| 表示条件 | `detailMode === 'schedule' && lesson` |

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 课次标题 | `lesson.title` | `string` | `N4 语法专项 1` |
| 时间 | `lesson.date / endTime` | `string` | `2026-03-16 20:00 - 21:30` |
| 班级 / 教师 / 教室 | `lesson.className / teacher / classroom` | `string` | `2026 冲刺 A 班 · 佐藤老师...` |
