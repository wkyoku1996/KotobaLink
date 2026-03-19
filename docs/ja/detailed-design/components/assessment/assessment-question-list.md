# Assessment 設問一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ASSESS-003` |
| 実装元 | `pages/learning/assessment-detail/index.wxml` / `index.js` |
| 関連イベント | `selectOption` / `inputBlank` / `submitAssessment` / `resetAssessment` |

## 責務
演示题目表示、解答入力、結果算出、再作答をまとめて担当します。正式版では試験回答 API と連携する前提です。

## backend データ要求
主な backend エンティティ: `AssessmentQuestion`, `AssessmentAnswerSheet`, `AssessmentSubmission`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 設問一覧取得 | `GET` | `/api/v1/students/{studentId}/assessments/{assessmentId}/questions` |
| 回答提交 | `POST` | `/api/v1/students/{studentId}/assessments/{assessmentId}/submissions` |
