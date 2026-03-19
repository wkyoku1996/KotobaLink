# Lesson 基本情報

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-002` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` |

## 責務
授課老师、上课教室、课程状态を表示する基本情報セクションです。

## backend データ要求
主な backend エンティティ: `Lesson`, `Teacher`, `Classroom`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| Lesson 詳細取得 | `GET` | `/api/v1/students/{studentId}/lessons/{lessonId}` |
