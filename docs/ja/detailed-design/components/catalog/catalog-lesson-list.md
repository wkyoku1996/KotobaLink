# コース詳細 レッスン一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-006` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |
| 直接依存 service | `getCatalogCourseDetail()` |
| 関連イベント | `openLessonDetail` |

## 責務

このコンポーネントは、対象コースに紐づく Lesson を一覧表示し、詳細ページへの遷移入口を提供します。ユーザーは日付、教室、講師、状態、概要を一覧で確認したうえで、個別 Lesson に入ることができます。

## 表示フィールド表

| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| タイトル | `item.title` | `string` | `第 1 回 自己介绍` | Lesson 識別 |
| 日時 | `item.date` / `item.endTime` | `string` | `2026-03-20 - 21:30` | 開催日時表示 |
| 教室 | `item.classroom` | `string` | `在线直播教室 A` | 実施場所表示 |
| 講師 | `item.teacher` | `string` | `佐藤老师` | 担当者表示 |
| 状態 | `item.status` | `string` | `待上课` | 進行状態表示 |
| 概要 | `item.summary` | `string` | `完成初次会话训练` | 内容要約 |

## 操作項目表

| 操作対象 | イベント | 発火条件 | 処理 | 遷移先 |
| --- | --- | --- | --- | --- |
| Lesson 行 | `openLessonDetail` | 行押下時 | `lessonId` を付与して遷移 | `/pages/learning/lesson-detail/index` |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 用途 |
| --- | --- | --- | --- | --- |
| `detail.lessons` | `Array` | はい | `getCatalogCourseDetail()` | 一覧描画 |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `detail.lessons.length === 0` | `当前课程暂无 lesson 安排。` を表示 |
| `lessonId` 欠落 | 押下しても詳細遷移先が不完全になる可能性 |
