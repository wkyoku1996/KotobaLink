# 课表 周课表面板

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-SCHEDULE-002` |
| 実装元 | `pages/learning/schedule/index.wxml` / `index.js` |
| 中間加工関数 | `buildWeekView()` |

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 周范围 | `weekView.rangeLabel` | `string` | `3/17 - 3/23` |
| 星期标签 | `item.weekLabel` | `string` | `三` |
| 日期标签 | `item.dateLabel` | `string` | `3/18` |
| 今日标记 | `item.isToday` | `boolean` | `true` |
| 课程标题 | `course.title` | `string` | `第 7 课 出行表达` |
| 班级摘要 | `course.classBrief` | `string` | `春季 1 班` |

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 课程标题 | `openScheduleItem` | activity なら活动页、否则 lesson 详情页遷移 |
