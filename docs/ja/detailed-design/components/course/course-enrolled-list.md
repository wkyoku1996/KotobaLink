# コース 受講中コース一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-COURSE-002` |
| 実装元 | `pages/tab/course/index.wxml` / `index.js` |
| 関連イベント | `goToEnrolledCourseDetail` |
| 直接依存 service | `getDemoData()` |

## 責務

このコンポーネントは、現在受講中のコース一覧を表示し、受講中コース詳細ページへの入口を提供します。コース名、クラス、講師、サービス状態をカード単位で表示します。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| コース名 | `item.courseName` | `string` | コース識別 |
| クラス名 | `item.className` | `string` | 受講枠識別 |
| 講師名 | `item.teacher` | `string` | 担当者表示 |
| サービス状態 | `item.serviceStatus` | `string` | 進行状態表示 |

## frontend 操作項目表

| 操作対象 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- |
| 一覧項目 | `goToEnrolledCourseDetail` | `data-id` から対象コース決定 | `/pages/account/profile-course-detail/index?id=*` |

## backend データ要求

主な backend エンティティ:
- `Enrollment`
- `Course`
- `Class`
- `Teacher`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 受講中コース一覧取得 | `GET` | `/api/v1/students/{studentId}/enrollments` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `item.id` | `enrollment.courseId` |
| `item.courseName` | `enrollment.course.name` |
| `item.className` | `enrollment.class.name` |
| `item.teacher` | `enrollment.teacher.displayName` |
| `item.serviceStatus` | `enrollment.serviceStatusLabel` |

## 実装メモまたは移行メモ

- demo では `learningArchive.enrolledCourses` を直接使用
- 正式版では enrollment 一覧が source of truth になる
