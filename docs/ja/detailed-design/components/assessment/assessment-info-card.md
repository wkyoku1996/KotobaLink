# Assessment 情報カード

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ASSESS-002` |
| 実装元 | `pages/learning/assessment-detail/index.wxml` |

## 責務
考试时间、任课老师、考核说明を表示する読み取り専用情報カードです。

## backend データ要求
主な backend エンティティ: `Assessment`, `Teacher`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| Assessment 情報取得 | `GET` | `/api/v1/students/{studentId}/assessments/{assessmentId}` |
