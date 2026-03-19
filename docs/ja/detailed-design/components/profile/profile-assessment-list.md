# マイページ 評価一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-006` |
| 実装元 | `pages/tab/profile/index.wxml` |
| データ源 | `growth.assessments` |

## 責務

关键测评与评分セクションとして、評価タイトル、得点、日付、種別、担当講師、概要を一覧表示します。現時点では詳細ページへの遷移はありません。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | `item.title` | `string` |
| 得点 | `item.score` | `string` |
| 日付 | `item.date` | `string` |
| 種別 | `item.type` | `string` |
| 講師 | `item.teacher` | `string` |
| 概要 | `item.summary` | `string` |
