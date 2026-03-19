# 宿題 提出結果エリア

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-HOMEWORK-002` |
| 実装元 | `pages/learning/homework/index.wxml` / `index.js` |
| 関連イベント | `submitHomework` / `goProfile` |

## 責務
宿題未提出時の提出操作と、提出後の完了表示およびマイページ導線を担当します。

## backend データ要求
主な backend エンティティ: `HomeworkSubmission`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 宿題提出 | `POST` | `/api/v1/students/{studentId}/homework/{homeworkId}/submissions` |

## 書込 / 更新 API
| 操作 | Method | Path | body |
| --- | --- | --- | --- |
| 提出 | `POST` | `/api/v1/students/{studentId}/homework/{homeworkId}/submissions` | 提出内容 |
