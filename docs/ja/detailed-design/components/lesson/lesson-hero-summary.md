# Lesson Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-001` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` / `index.js` |
| 直接依存 service | `getLessonDetail()` |

## 責務

Lesson 詳細ページの対象 Lesson を識別するヘッダーです。タイトル、所属コース、クラス、日時、状態をまとめて表示します。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | `lesson.title` | `string` |
| 副題 | `lesson.courseName` / `lesson.className` | `string` |
| 日時バッジ | `lesson.date` / `lesson.endTime` | `string` |
| 状態バッジ | `lesson.status` | `string` |
