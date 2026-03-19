# 決済完了 注文情報カード

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PAYMENT-002` |
| 実装元 | `pages/commerce/payment/index.wxml` / `index.js` |
| 関連イベント | `goSchedule` |

## 責務
注文結果詳細と課表への後続導線を表示します。

## backend データ要求
主な backend エンティティ: `Order`, `OrderItem`, `ServiceProvision`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 注文結果取得 | `GET` | `/api/v1/orders/{orderId}` |

## API フィールド対応表
| 画面フィールド | 想定 response フィールド |
| --- | --- |
| コース名 | `order.items[0].courseName` |
| クラス名 | `order.items[0].className` |
| 金額 | `order.payment.amountLabel` |
| 開通状態 | `order.serviceStatusLabel` |
