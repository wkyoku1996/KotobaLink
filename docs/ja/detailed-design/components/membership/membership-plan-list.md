# 会員 プラン一覧

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MEMBER-003` |
| 実装元 | `pages/account/membership/index.wxml` |

## 責務
アップグレード可能な会員プランの一覧表示を担当します。

## backend データ要求
主な backend エンティティ: `MembershipPlan`, `PricingPlan`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| プラン一覧取得 | `GET` | `/api/v1/students/{studentId}/membership/plans` |
