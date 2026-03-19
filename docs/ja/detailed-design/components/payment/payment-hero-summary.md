# 決済完了 Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PAYMENT-001` |
| 実装元 | `pages/commerce/payment/index.wxml` |
| 直接依存 service | `getDemoData()` |

## 責務

決済完了ページの冒頭で、支払い成功状態と対象コース名を提示します。ページ全体の結果種別を最初に識別させるヘッダーです。

## 表示フィールド表

| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| タイトル | 固定文言 | `string` | `支付成功` |
| 副題 | `demo.paymentOrder.courseName` / `demo.student.course` | `string` | `你已成功购买 JLPT N4 冲刺班` |
