# マイページ 評価一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-006` |
| 実装元 | `pages/tab/profile/index.wxml` |

## 責務
关键测评与评分の一覧表示を担当します。

## backend データ要求
主な backend エンティティ: `AssessmentResult`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 評価履歴取得 | `GET` | `/api/v1/students/{studentId}/assessments` |
