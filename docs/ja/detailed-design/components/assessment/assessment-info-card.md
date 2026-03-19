# Assessment 情報カード

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ASSESS-002` |
| 実装元 | `pages/learning/assessment-detail/index.wxml` |
| データ源 | `assessment` |

## 責務

Assessment の基本情報として、考试时间、任课老师、考核说明を固定 3 行で表示します。問題一覧の前に、評価の前提情報を確認するための読み取り専用セクションです。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| 考试时间 | `assessment.date` | `string` | 実施日表示 |
| 任课老师 | `assessment.teacher` | `string` | 担当講師表示 |
| 考核说明 | `assessment.summary` | `string` | 試験概要表示 |
