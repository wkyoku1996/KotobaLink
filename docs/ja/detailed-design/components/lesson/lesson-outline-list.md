# Lesson 大綱一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-003` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` |

## 責務
Lesson の進行項目を順序付き一覧で表示します。

## backend データ要求
主な backend エンティティ: `LessonOutline`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| Lesson 大綱取得 | `GET` | `/api/v1/students/{studentId}/lessons/{lessonId}/outline` |
