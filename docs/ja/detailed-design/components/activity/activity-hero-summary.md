# イベント Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ACTIVITY-001` |
| 実装元 | `pages/engagement/activity/index.wxml` |
| 直接依存 service | `getDemoData()` |

## 責務
イベントページの対象イベントを識別するヘッダーです。タイトル、概要、申込状態、料金を表示し、ページ本文の前提情報を提示します。

## 表示フィールド表
| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | `demo.activity.title` | `string` |
| 副題 | `demo.activity.desc` | `string` |
| 状態 | `demo.activity.status` | `string` |
| 料金 | `demo.activity.fee` | `string` |

## backend データ要求
主な backend エンティティ: `Activity`, `ActivityRegistration`, `Student`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| イベント詳細取得 | `GET` | `/api/v1/students/{studentId}/activities/{activityId}` |

## API フィールド対応表
| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `title` | `activity.title` |
| `desc` | `activity.summary` |
| `status` | `registration.statusLabel` |
| `fee` | `activity.feeLabel` |
