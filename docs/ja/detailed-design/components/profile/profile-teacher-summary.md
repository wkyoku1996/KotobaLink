# マイページ 講師サマリー

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-008` |
| 実装元 | `pages/tab/profile/index.wxml` |

## 責務
教師からの総評、強み、次段階重点を文章で表示します。

## backend データ要求
主な backend エンティティ: `TeacherComment`, `StudentGrowthReview`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 教師サマリー取得 | `GET` | `/api/v1/students/{studentId}/teacher-summary` |
