# マイページ 成長サマリー

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-003` |
| 実装元 | `pages/tab/profile/index.wxml` |

## 責務
成長概要カード群を表示します。主要 KPI を一覧で提示する要約領域です。

## backend データ要求
主な backend エンティティ: `StudentGrowthSnapshot`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 成長サマリー取得 | `GET` | `/api/v1/students/{studentId}/growth/summary` |
