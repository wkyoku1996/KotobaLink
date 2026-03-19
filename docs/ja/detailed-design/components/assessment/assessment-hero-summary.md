# Assessment Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ASSESS-001` |
| 実装元 | `pages/learning/assessment-detail/index.wxml` / `index.js` |

## 責務
Assessment 詳細ページの対象考试を識別するヘッダーです。タイトル、所属コース、クラス、種別、状態、得点を表示します。

## backend データ要求
主な backend エンティティ: `Assessment`, `AssessmentResult`, `Enrollment`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| Assessment 詳細取得 | `GET` | `/api/v1/students/{studentId}/assessments/{assessmentId}` |
