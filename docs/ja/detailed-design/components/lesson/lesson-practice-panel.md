# Lesson 演習パネル

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-006` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` / `index.js` |
| 関連イベント | `selectOption` / `inputBlank` / `submitPractice` / `resetPractice` |

## 責務
課後练习表示、解答入力、結果算出、再作答を担当します。

## backend データ要求
主な backend エンティティ: `LessonPractice`, `LessonPracticeSubmission`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 演習問題取得 | `GET` | `/api/v1/students/{studentId}/lessons/{lessonId}/practice` |
| 演習回答提交 | `POST` | `/api/v1/students/{studentId}/lessons/{lessonId}/practice/submissions` |
