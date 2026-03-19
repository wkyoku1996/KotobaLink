# スケジュール Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-SCHEDULE-001` |
| 実装元 | `pages/learning/schedule/index.wxml` |
| 直接依存 service | `getDemoData()` / `getDemoToday()` |

## 責務

スケジュールページの週次対象を示すヘッダーです。現在週や课程数量など、週ボードの前提情報を表示します。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | 固定文言または週表現 | `string` |
| 補助情報 | 集計済み週次データ | `string` |
