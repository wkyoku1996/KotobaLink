# 受講中コース Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-ENROLLED-001` |
| 実装元 | `pages/account/profile-course-detail/index.wxml` / `index.js` |
| 直接依存 service | `getEnrolledCourseDetail()` |

## 責務

このコンポーネントは、受講中コース詳細ページの対象コースを識別するためのヘッダーです。購入済みコースのみを対象とし、コースタイトルをページ冒頭で表示します。

## 表示フィールド表

| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| タイトル | `detail.title` | `string` | `JLPT N4 冲刺班` | 受講中コース識別 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 用途 |
| --- | --- | --- | --- | --- |
| `options.id` | `string` | はい | ページ URL | コース取得 |
| `detail` | `object` | はい | `getEnrolledCourseDetail()` | タイトル表示 |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `detail` 未取得 | ページ全体が `wx:if` 条件により非表示 |
