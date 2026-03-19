# コース詳細 Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-001` |
| 実装元 | `pages/catalog/course-detail/index.wxml` / `index.js` |
| 直接依存 service | `getCourseById()` / `getCatalogCourseDetail()` |
| 関連 state | `isPurchased` |

## 責務

このコンポーネントは、コース詳細ページの冒頭で対象コースを識別するための要約領域です。コース名を主見出しとして表示し、種別、受講期間、募集状態を 1 行にまとめて表示します。

この領域は識別用ヘッダーであり、購入処理や Lesson 遷移の起点にはなりません。ページ下部の各セクションが参照する対象コースが何であるかを、ページ冒頭で即時に判断できる状態にすることが目的です。

## 表示構造

1. コースタイトル
2. `course.type` / `course.duration` / `course.status` を連結した副題

## 表示フィールド表

| 表示名 | キー | 型 | 例 | 用途 | 空値時 |
| --- | --- | --- | --- | --- | --- |
| タイトル | `detail.title` | `string` | `JLPT N4 冲刺班` | 対象コース識別 | ページ表示不可 |
| 種別 | `course.type` | `string` | `考试课程` | コース分類表示 | 副題から除外 |
| 期間 | `course.duration` | `string` | `10 周` | 受講期間表示 | 副題から除外 |
| 状態 | `course.status` | `string` | `热招中` | 現在の募集状態表示 | 副題から除外 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 用途 |
| --- | --- | --- | --- | --- |
| `options.id` | `string` | はい | ページ URL | 対象コース取得 |
| `detail` | `object` | はい | `getCatalogCourseDetail()` | タイトル表示 |
| `course` | `object` | はい | `getCourseById()` | 副題表示 |

## 状態連動表

| 関連 state | 利用箇所 | 影響 |
| --- | --- | --- |
| `isPurchased` | 間接 | Hero 内表示は変わらないが、同一ページ下部の購入操作区の表示条件に影響 |

## データ流入元 / 流出先

| 種別 | 内容 |
| --- | --- |
| 流入元 | `refresh()` 内の `getCourseById()` / `getCatalogCourseDetail()` |
| 流出先 | なし |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `detail` が取得できない | ページ全体が `wx:if` 条件により非表示 |
| `course` の一部属性が欠落 | 副題の該当要素のみ欠落 |
