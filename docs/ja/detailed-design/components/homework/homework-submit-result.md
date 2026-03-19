# 宿題 提出結果エリア

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-HOMEWORK-002` |
| 実装元 | `pages/learning/homework/index.wxml` / `index.js` |
| 関連イベント | `submitHomework` / `goProfile` |
| 関連 state | `homeworkSubmitted` |

## 責務

このコンポーネントは、未提出時の提出ボタンと、提出後の完了メッセージおよび学習档案導線を切り替えて表示します。

## 表示規則

- `demo.homeworkSubmitted === false` の場合は `提交作业` ボタンを表示
- `demo.homeworkSubmitted === true` の場合は完了メッセージと `查看学习档案` ボタンを表示

## 操作項目表

| 操作対象 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- |
| 提出按钮 | `submitHomework` | `homeworkSubmitted = true` に更新 | なし |
| 档案按钮 | `goProfile` | Tab 切替 | `/pages/tab/profile/index` |
