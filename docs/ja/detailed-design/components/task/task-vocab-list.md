# タスク 単語一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-TASK-002` |
| 実装元 | `pages/tab/task/index.wxml` / `index.js` |
| 関連イベント | `openWordCard` |

## 責務
当日タスク対象の語彙カード一覧を表示し、単語詳細モーダルの起点を提供します。

## backend データ要求
主な backend エンティティ: `DailyTaskVocabulary`, `VocabularyProgress`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 当日単語一覧取得 | `GET` | `/api/v1/students/{studentId}/daily-tasks/{taskId}/vocab` |

## API フィールド対応表
| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `item.word` | `vocab.word` |
| `item.reading` | `vocab.reading` |
| `item.meaning` | `vocab.meaning` |
| `item.learned` | `vocab.isLearned` |
