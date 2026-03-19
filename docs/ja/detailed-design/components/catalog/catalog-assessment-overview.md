# コース詳細 評価概要

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-CATALOG-007` |
| 実装元 | `pages/catalog/course-detail/index.wxml` |
| データ源 | `detail.assessmentOverview` |

## 責務

このコンポーネントは、対象コースに予定されている考核・考试の概要情報をラベルと値の組で表示します。個別評価詳細へ遷移する一覧ではなく、コース全体の評価構成を要約するセクションです。

## 表示フィールド表

| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| 項目ラベル | `item.label` | `string` | `阶段测试` | 評価項目識別 |
| 項目値 | `item.value` | `string` | `2 次` | 評価構成表示 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 用途 |
| --- | --- | --- | --- | --- |
| `detail.assessmentOverview` | `Array of label/value objects` | はい | `getCatalogCourseDetail()` | 一覧描画 |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| 配列が空 | セクション見出しのみ表示 |
