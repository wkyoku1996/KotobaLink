# 会員 Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MEMBER-001` |
| 実装元 | `pages/account/membership/index.wxml` |

## 責務
会員ページのタイトルと現在の会員種別を表示します。

## backend データ要求
主な backend エンティティ: `Membership`, `Student`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| 会員ヘッダー取得 | `GET` | `/api/v1/students/{studentId}/membership` |
