# 決済完了 Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PAYMENT-001` |
| 実装元 | `pages/commerce/payment/index.wxml` |

## 責務
決済成功状態と対象コース名を冒頭表示します。

## backend データ要求
主な backend エンティティ: `Order`, `Payment`, `OrderItem`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 注文結果取得 | `GET` | `/api/v1/orders/{orderId}` |
