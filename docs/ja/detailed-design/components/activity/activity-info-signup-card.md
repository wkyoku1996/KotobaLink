# イベント 情報・申込カード

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ACTIVITY-002` |
| 実装元 | `pages/engagement/activity/index.wxml` / `index.js` |
| 関連イベント | `toggleSignup` / `goSchedule` |

## 責務
イベント基本情報表示と申込 / 取消書込を担当します。イベント状態変更の起点となる操作コンポーネントです。

## 表示フィールド表
| 表示名 | キー | 型 |
| --- | --- | --- |
| 类型 | `demo.activity.type` | `string` |
| 时间 | `demo.activity.time` | `string` |
| 地点 | `demo.activity.location` | `string` |
| 费用 / 状态 | `demo.activity.fee` / `demo.activity.status` | `string` |

## backend データ要求
主な backend エンティティ: `Activity`, `ActivityRegistration`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| イベント申込 | `POST` | `/api/v1/students/{studentId}/activities/{activityId}/registrations` |
| イベント申込取消 | `DELETE` | `/api/v1/students/{studentId}/activities/{activityId}/registrations/{registrationId}` |

## 書込 / 更新 API
| 操作 | Method | Path | body |
| --- | --- | --- | --- |
| 申込 | `POST` | `/api/v1/students/{studentId}/activities/{activityId}/registrations` | なし |
| 取消 | `DELETE` | `/api/v1/students/{studentId}/activities/{activityId}/registrations/{registrationId}` | なし |
