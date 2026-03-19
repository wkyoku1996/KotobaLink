# 宿題 内容カード

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-HOMEWORK-001` |
| 実装元 | `pages/learning/homework/index.wxml` |

## 責務
当日宿題のコース名と課題一覧を表示します。提出前に対象課題を確認するための表示領域です。

## backend データ要求
主な backend エンティティ: `HomeworkAssignment`, `HomeworkTask`, `Enrollment`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 宿題詳細取得 | `GET` | `/api/v1/students/{studentId}/homework/current` |
