# マイページ 学習アーカイブ

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-002` |
| 実装元 | `pages/tab/profile/index.wxml` |
| データ源 | `demo.learningArchive.summary` |

## 責務

学習档案の要約として、课时完成情况と作业完成情况の 2 枚カードを表示します。プロフィールページ内の学習履歴サマリー領域です。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 课时完成情况 | `lessonCompleted` / `lessonTotal` | `number` |
| 待补课 | `pendingMakeups` | `number` |
| 作业完成情况 | `homeworkCompleted` / `homeworkTotal` | `number` |
