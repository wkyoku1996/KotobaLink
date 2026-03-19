# スケジュール 週間ボード

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-SCHEDULE-002` |
| 実装元 | `pages/learning/schedule/index.wxml` / `index.js` |
| 中間加工関数 | `buildWeekView()` |
| 関連イベント | `openScheduleItem` |

## 責務

このコンポーネントは、対象週の 7 日分を行単位で表示し、授業予定またはイベント予定をカードとして配置します。押下時はイベントなら活動ページへ、授業なら Lesson 詳細へ遷移します。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 周范围 | `weekView.rangeLabel` | `string` |
| 星期标签 | `item.weekLabel` | `string` |
| 日期标签 | `item.dateLabel` | `string` |
| 今日标记 | `item.isToday` | `boolean` |
| 课程标题 | `course.title` | `string` |
| 班级摘要 | `course.classBrief` | `string` |

## frontend 操作項目表

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 予定項目 | `openScheduleItem` | 活動なら活动页、授業なら Lesson 詳細へ遷移 |

## backend データ要求

主な backend エンティティ:
- `ScheduleSession`
- `ActivityRegistration`
- `Course`
- `Lesson`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 週間スケジュール取得 | `GET` | `/api/v1/students/{studentId}/schedule/week` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `weekView.rangeLabel` | `week.rangeLabel` または frontend 生成 |
| `course.title` | `session.title` |
| `course.classBrief` | `session.class.shortName` |
| `course.isActivity` | `session.kind === 'activity'` |
| `lessonId` | `session.lessonId` |
| `courseId` | `session.courseId` |

## 実装メモまたは移行メモ

- demo では `activitySignedUp` を元に活动項目を frontend で差し込む
- 正式版では backend が活動参加状態込みで週間予定を返す方が整合しやすい
