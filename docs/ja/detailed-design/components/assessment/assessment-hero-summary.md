# Assessment Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ASSESS-001` |
| 実装元 | `pages/learning/assessment-detail/index.wxml` / `index.js` |
| 直接依存 service | `getAssessmentDetail()` |

## 責務

Assessment 詳細ページの対象考试を識別するヘッダーです。試験タイトル、所属コース、クラス、種別、状态、得点をまとめて表示します。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | `assessment.title` | `string` |
| 副題 | `assessment.courseName` / `assessment.className` | `string` |
| 種別バッジ | `assessment.type` | `string` |
| 状態バッジ | `assessment.status` | `string` |
| スコアバッジ | `assessment.score` | `string` |
