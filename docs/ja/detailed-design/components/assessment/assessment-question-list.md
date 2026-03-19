# Assessment 設問一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ASSESS-003` |
| 実装元 | `pages/learning/assessment-detail/index.wxml` / `index.js` |
| 関連イベント | `selectOption` / `inputBlank` / `submitAssessment` / `resetAssessment` |
| ページ state | `answers` / `result` |

## 責務

このコンポーネントは演示题目一覧、ユーザー解答入力、結果表示、再作答操作をまとめて扱います。選択式と穴埋め式の 2 種類に対応しています。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| 問題文 | `question.prompt` | `string` | 設問表示 |
| 選択肢 | `question.options` | `Array` | 選択式入力 |
| プレースホルダ | `question.placeholder` | `string` | 穴埋め入力補助 |
| 正答 | `question.correctAnswer` / `question.answer` | `string` | 結果表示後に表示 |

## 操作項目表

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| 選択肢 | `selectOption` | `answers[question.id]` を更新 |
| 入力欄 | `inputBlank` | `answers[question.id]` を更新 |
| 提出ボタン | `submitAssessment` | 正答数を算出し `result` を更新 |
| 再作答ボタン | `resetAssessment` | `answers` / `result` を初期化 |
