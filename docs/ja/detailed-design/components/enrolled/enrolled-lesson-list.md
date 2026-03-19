# 受講中コース レッスン一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ENROLLED-005` |
| 実装元 | `pages/account/profile-course-detail/index.wxml` / `index.js` |
| 関連イベント | `openLessonDetail` |

## 責務
受講中コースの Lesson 一覧を表示し、Lesson 詳細への入口を提供します。

## backend データ要求
主な backend エンティティ: `EnrollmentLesson`, `Lesson`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 受講中 Lesson 一覧取得 | `GET` | `/api/v1/students/{studentId}/enrollments/{enrollmentId}/lessons` |
