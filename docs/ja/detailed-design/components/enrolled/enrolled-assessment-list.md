# 受講中コース 評価一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ENROLLED-006` |
| 実装元 | `pages/account/profile-course-detail/index.wxml` / `index.js` |
| 関連イベント | `openAssessmentDetail` |

## 責務
受講中コースに紐づく Assessment 一覧を表示し、Assessment 詳細への入口を提供します。

## backend データ要求
主な backend エンティティ: `Assessment`, `AssessmentResult`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 受講中 Assessment 一覧取得 | `GET` | `/api/v1/students/{studentId}/enrollments/{enrollmentId}/assessments` |
