# コース Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-COURSE-001` |
| 実装元 | `pages/tab/course/index.wxml` |
| 直接依存 service | `getDemoData()` |

## 責務

このコンポーネントは、コースページ全体の進度要約として、课时完成、作业完成、待补课、等级をまとめて表示します。コース一覧そのものではなく、受講サービス全体の現在値を先に提示するための要約領域です。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| タイトル | 固定文言 | `string` | 見出し |
| 课时完成 | `lessonCompleted` / `lessonTotal` | `number` | 進度表示 |
| 作业完成 | `homeworkCompleted` / `homeworkTotal` | `number` | 学習継続状況表示 |
| 待补课 | `pendingMakeups` | `number` | 未消化分表示 |
| 等级 | `demo.student.level` | `string` | 学習段階表示 |

## frontend 入力パラメータ表

| キー | 型 | 必須 | 供給元 |
| --- | --- | --- | --- |
| `demo.learningArchive.summary` | `object` | はい | `getDemoData()` |
| `demo.student.level` | `string` | はい | `getDemoData()` |

## backend データ要求

正式版では、学员档案、受講進度、宿題進度、补课残数を横断して返す集約 API が必要です。

主な backend エンティティ:
- `Student`
- `Enrollment`
- `LessonProgress`
- `HomeworkSubmission`
- `MakeupRequest`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| コースページ要約取得 | `GET` | `/api/v1/students/{studentId}/course-dashboard/summary` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `lessonCompleted` | `summary.lessonCompleted` |
| `lessonTotal` | `summary.lessonTotal` |
| `homeworkCompleted` | `summary.homeworkCompleted` |
| `homeworkTotal` | `summary.homeworkTotal` |
| `pendingMakeups` | `summary.pendingMakeups` |
| `demo.student.level` | `student.levelLabel` |

## 実装メモまたは移行メモ

- demo では `getDemoData()` で一括取得している
- 正式版ではコースページ専用要約 API を用意した方が一覧表示前の初期描画を分離しやすい
