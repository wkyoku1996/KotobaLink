# マイページ マイルストーン

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-007` |
| 実装元 | `pages/tab/profile/index.wxml` |

## 責務
成長里程碑の時系列一覧を表示します。

## backend データ要求
主な backend エンティティ: `StudentMilestone`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| マイルストーン取得 | `GET` | `/api/v1/students/{studentId}/milestones` |
