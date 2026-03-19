# 课程 可购买课程列表

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-COURSE-003` |
| 実装元 | `pages/tab/course/index.wxml` / `index.js` |
| 直接依存 service | `getDemoData()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| セクションタイトル | 固定文言 | `string` | `可购买课程` | 見出し |
| 课程名 | `item.name` | `string` | `JLPT N4 冲刺班` | 商品識別 |
| 类型 / 周期 | `item.type` / `item.duration` | `string` | `考试课程 · 10 周` | 商品属性 |
| 概要 | `item.summary` | `string` | `围绕词汇、语法...` | 商品紹介 |
| 空文言 | 固定文言 | `string` | `当前课程都已开通...` | 空状態表示 |

## 入力パラメータ表
| キー | 型 | 必須 | 供給元 | 加工 |
| --- | --- | --- | --- | --- |
| `purchasableCourses` | `Array` | はい | `demoData.courses.filter((item) => !item.isEnrolled)` | enrolled 排除 |

## 操作項目表
| 操作対象 | 表示 | 発火条件 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- | --- | --- |
| 一覧項目 | 课程卡片 | `purchasableCourses.length > 0` | `goToPurchasableCourseDetail` | `data-id` 取得 | `/pages/catalog/course-detail/index?id=*` |

## 状態連動表
| 関連 state | 影響 |
| --- | --- |
| `purchasedCourseIds` | 購入後にこの一覧から消える |

## データ流入元 / 流出先
| 種別 | 内容 |
| --- | --- |
| 流入元 | `getDemoData()` |
| 流出先 | 课程详情頁 |
