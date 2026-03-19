# マイページ 成績推移グラフ

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-004` |
| 実装元 | `pages/tab/profile/index.wxml` / `index.js` |
| 中間加工関数 | `buildTrendBars()` |
| 直接依存 service | `getProfileGrowthData()` |

## 責務

このコンポーネントは、课堂表现、作业质量、习题/小测の 3 系列を週次または阶段単位で棒グラフ表示します。履歴データを画面表示向けに高さへ変換する selector を内包します。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 阶段标签 | `item.label` | `string` |
| 课堂柱高 | `item.lessonHeight` | `string` |
| 作业柱高 | `item.homeworkHeight` | `string` |
| 小测柱高 | `item.quizHeight` | `string` |

## backend データ要求

主な backend エンティティ:
- `StudentStageScore`
- `LessonScore`
- `HomeworkScore`
- `QuizScore`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 成績推移取得 | `GET` | `/api/v1/students/{studentId}/growth/score-trend` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `item.label` | `trend.label` |
| `item.lessonHeight` | `trend.lessonScore` から frontend 変換 |
| `item.homeworkHeight` | `trend.homeworkScore` から frontend 変換 |
| `item.quizHeight` | `trend.quizScore` から frontend 変換 |

## 実装メモまたは移行メモ

- 棒の高さ変換は frontend selector に残してよい
- backend は 0-100 の score 値を返す前提で設計可能
