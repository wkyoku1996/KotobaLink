# Lesson 重点単語

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-004` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` |

## 責務
Lesson に含まれる重点词汇を一覧表示します。

## backend データ要求
主な backend エンティティ: `LessonVocabulary`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| Lesson 重点単語取得 | `GET` | `/api/v1/students/{studentId}/lessons/{lessonId}/vocab` |
