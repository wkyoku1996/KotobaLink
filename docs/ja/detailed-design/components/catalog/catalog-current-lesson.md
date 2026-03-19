# コース詳細 現在レッスンカード

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-002` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |
| 表示条件 | `detailMode === 'schedule' && lesson` |
| 直接依存 service | `getScheduleLessonById()` |

## 責務

このコンポーネントは、スケジュール画面経由でコース詳細へ遷移した場合に限り、遷移元として選択された現在レッスンをページ上部に再表示するためのカードです。

コース詳細の一般情報とは別に、「どのレッスン文脈でこのページへ来たか」を保持するための補助表示であり、一覧内の各 Lesson 項目とは役割が異なります。

## 表示フィールド表

| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| タイトル | `lesson.title` | `string` | `第 3 回 敬语入门` | 対象レッスン識別 |
| 日時 | `lesson.date` / `lesson.endTime` | `string` | `2026-03-20 - 21:30` | 開催日時表示 |
| クラス名 | `lesson.className` | `string` | `2026 冲刺 A 班` | 所属クラス表示 |
| 講師名 | `lesson.teacher` | `string` | `佐藤老师` | 授業担当表示 |
| 教室 | `lesson.classroom` | `string` | `在线直播教室 A` | 実施場所表示 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 用途 |
| --- | --- | --- | --- | --- |
| `options.source` | `string` | はい | ページ URL | 表示モード判定 |
| `options.lessonId` | `string` | はい | ページ URL | 対象レッスン取得 |
| `lesson` | `object` | はい | `getScheduleLessonById()` | カード表示 |

## 出力イベント表

| イベント | 発火元 | 内容 |
| --- | --- | --- |
| なし | なし | 本カード自体には押下イベントなし |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `source !== 'schedule'` | セクション自体を描画しない |
| `lesson` が取得できない | セクション自体を描画しない |
