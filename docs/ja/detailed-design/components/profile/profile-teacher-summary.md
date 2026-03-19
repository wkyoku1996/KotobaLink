# マイページ 講師サマリー

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-008` |
| 実装元 | `pages/tab/profile/index.wxml` |
| データ源 | `growth.teacherSnapshot` |

## 責務

教师成长总结セクションとして、总体评价、当前优势、下一阶段重点の 3 項目を表示します。成長状況を文章で要約する静的表示領域です。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 总体评价 | `growth.teacherSnapshot.overall` | `string` |
| 当前优势 | `growth.teacherSnapshot.strengths` | `string` |
| 下一阶段重点 | `growth.teacherSnapshot.nextFocus` | `string` |
