# タスク 単語詳細モーダル

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-TASK-004` |
| 実装元 | `pages/tab/task/index.wxml` / `index.js` |
| 関連イベント | `openWordCard` / `closeWordCard` / `markWordLearned` |
| 関連 state | `activeWord` / `showWordModal` / `learnedVocabIds` |

## 責務

このコンポーネントは、選択した単語の読み、意味、例句を詳細表示し、学習済み記録を書き込むモーダルです。単なる表示ではなく、語彙学習進度更新の UI 起点です。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 単語 | `activeWord.word` | `string` |
| 読み | `activeWord.reading` | `string` |
| 意味 | `activeWord.meaning` | `string` |
| 例句 | `activeWord.example` | `string` |

## frontend 操作項目表

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| マスク領域 | `closeWordCard` | モーダル閉鎖 |
| 主按钮 | `markWordLearned` | `learnedVocabIds` 更新 |
| 次按钮 | `closeWordCard` | モーダル閉鎖 |

## backend データ要求

主な backend エンティティ:
- `DailyTaskVocabulary`
- `VocabularyProgress`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 単語学習状態更新 | `POST` | `/api/v1/students/{studentId}/daily-task-vocab/{vocabId}/learned` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `activeWord.word` | `vocab.word` |
| `activeWord.reading` | `vocab.reading` |
| `activeWord.meaning` | `vocab.meaning` |
| `activeWord.example` | `vocab.exampleSentence` |

## 書込 / 更新 API

| 操作 | Method | Path | body |
| --- | --- | --- | --- |
| 学習済み記録 | `POST` | `/api/v1/students/{studentId}/daily-task-vocab/{vocabId}/learned` | なし |
