# スケジュール Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-SCHEDULE-001` |
| 実装元 | `pages/learning/schedule/index.wxml` |

## 責務
対象週の範囲、件数などを要約表示するスケジュール上部サマリーです。

## backend データ要求
主な backend エンティティ: `ScheduleSession`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 週間スケジュール要約取得 | `GET` | `/api/v1/students/{studentId}/schedule/week-summary` |
