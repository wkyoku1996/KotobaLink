# Lesson 基本情報

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-002` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` |
| データ源 | `lesson` |

## 責務

このコンポーネントは、対象 Lesson の授課老师、上课教室、课程状态を固定 3 行で表示します。Lesson 全体の環境情報を確認するための読み取り専用セクションです。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| 授课老师 | `lesson.teacher` | `string` | 担当講師表示 |
| 上课教室 | `lesson.classroom` | `string` | 実施場所表示 |
| 课程状态 | `lesson.status` | `string` | 進行状態表示 |
