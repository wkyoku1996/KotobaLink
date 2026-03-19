# 受講中コース レッスン一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ENROLLED-005` |
| 実装元 | `pages/account/profile-course-detail/index.wxml` / `index.js` |
| 関連イベント | `openLessonDetail` |
| データ源 | `detail.lessons` |

## 責務

受講中コースの各 Lesson を一覧表示し、Lesson 詳細ページへの遷移入口を提供します。タイトル、状態、日時、講師、概要をまとめて確認できます。

## 操作項目表

| 操作対象 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- |
| Lesson 行 | `openLessonDetail` | `lessonId` を付与して遷移 | `/pages/learning/lesson-detail/index` |

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | `item.title` | `string` |
| 状態 | `item.status` | `string` |
| 日時 | `item.date` / `item.endTime` | `string` |
| 教室 | `item.classroom` | `string` |
| 講師 | `item.teacher` | `string` |
| 概要 | `item.summary` | `string` |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| 一覧空 | `当前课程暂无 lesson 安排。` を表示 |
