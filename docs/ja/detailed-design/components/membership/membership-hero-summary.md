# 会員 Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MEMBER-001` |
| 実装元 | `pages/account/membership/index.wxml` |
| 直接依存 service | `getDemoData()` |

## 責務

会員プランページのタイトルと、現在の会員種別を表示するヘッダーです。会員状態の識別のみを担当し、操作ボタンは持ちません。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| タイトル | 固定文言 | `string` |
| 会員種別 | `demo.student.membership` | `string` |
