# Lesson Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-001` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` / `index.js` |

## 責務
Lesson 詳細ページの対象 Lesson を識別するヘッダーです。

## backend データ要求
主な backend エンティティ: `Lesson`, `Enrollment`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| Lesson 詳細取得 | `GET` | `/api/v1/students/{studentId}/lessons/{lessonId}` |
