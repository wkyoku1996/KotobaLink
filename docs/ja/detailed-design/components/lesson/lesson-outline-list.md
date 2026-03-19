# Lesson 大綱一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-LESSON-003` |
| 実装元 | `pages/learning/lesson-detail/index.wxml` |
| データ源 | `lesson.outline` |

## 責務

Lesson の進行項目を番号付きで一覧表示します。各項目はテキストのみで、押下操作はありません。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| 大綱項目 | `item` | `string` | 授業内容の順序表示 |
| 連番 | `index + 1` | `number` | 順番表示 |
