# コース 購入可能コース一覧

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-COURSE-003` |
| 実装元 | `pages/tab/course/index.wxml` / `index.js` |
| 関連イベント | `goToPurchasableCourseDetail` |
| 直接依存 service | `getDemoData()` |

## 責務

このコンポーネントは、未受講の販売対象コースを一覧表示し、コース詳細ページへの入口を提供します。販売中商品のカタログ一覧として機能します。

## 表示フィールド表

| 表示名 | キー | 型 | 用途 |
| --- | --- | --- | --- |
| コース名 | `item.name` | `string` | 商品識別 |
| 类型 / 周期 | `item.type` / `item.duration` | `string` | 商品属性表示 |
| 概要 | `item.summary` | `string` | 商品紹介 |

## frontend 操作項目表

| 操作対象 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- |
| 一覧項目 | `goToPurchasableCourseDetail` | `data-id` から商品決定 | `/pages/catalog/course-detail/index?id=*` |

## backend データ要求

主な backend エンティティ:
- `CourseCatalog`
- `CourseOffering`
- `PricingPlan`
- `Enrollment`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 購入可能コース一覧取得 | `GET` | `/api/v1/students/{studentId}/course-catalog` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `item.id` | `offering.courseId` |
| `item.name` | `offering.courseName` |
| `item.type` | `offering.courseTypeLabel` |
| `item.duration` | `offering.durationLabel` |
| `item.summary` | `offering.summary` |

## 実装メモまたは移行メモ

- demo では `courses.filter((item) => !item.isEnrolled)` で生成
- 正式版では backend が購入可否を判定した一覧を返す必要がある
