# 课程详情 Lesson 列表

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-CATALOG-006` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| Lesson 标题 | `item.title` | `string` | `第 1 课 五十音入门` |
| 时间 | `item.date / endTime` | `string` | `2026-03-19 19:30 - 20:30` |
| 教室 / 教师 / 状态 | `item.classroom / teacher / status` | `string` | `基础学习专区 · 高桥老师...` |
| 概要 | `item.summary` | `string` | `认识平假名与片假名...` |

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 一覧項目 | `openLessonDetail` | lesson 详情頁遷移 |
