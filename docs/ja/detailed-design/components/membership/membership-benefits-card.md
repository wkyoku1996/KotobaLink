# 会員 現在の特典

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MEMBER-002` |
| 実装元 | `pages/account/membership/index.wxml` |

## 責務
現在の会員状態に紐づく特典一覧を表示します。

## backend データ要求
主な backend エンティティ: `MembershipBenefit`, `MembershipPlan`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 現在特典取得 | `GET` | `/api/v1/students/{studentId}/membership/benefits` |
