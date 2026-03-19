# 受講中コース 評価一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ENROLLED-006` |
| 実装元 | `pages/account/profile-course-detail/index.wxml` / `index.js` |
| 関連イベント | `openAssessmentDetail` |
| データ源 | `detail.assessments` |

## 責務

受講中コースに紐づく测试 / 考试を一覧表示し、Assessment 詳細への遷移入口を提供します。

## 操作項目表

| 操作対象 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- |
| Assessment 行 | `openAssessmentDetail` | `assessmentId` を付与して遷移 | `/pages/learning/assessment-detail/index` |

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | `item.title` | `string` |
| スコア | `item.score` | `string` |
| 日時 | `item.date` | `string` |
| 種別 | `item.type` | `string` |
| 概要 | `item.summary` | `string` |
| 状態 | `item.status` | `string` |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| 一覧空 | `当前课程暂无测试或考试安排。` を表示 |
