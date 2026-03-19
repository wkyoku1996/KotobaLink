# 课程 Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-COURSE-001` |
| 実装元 | `pages/tab/course/index.wxml` |
| 直接依存 service | `getDemoData()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| タイトル | 固定文言 | `string` | `学习进度总览` | 見出し |
| 课时完成 | `demo.learningArchive.summary.lessonCompleted` / `lessonTotal` | `number` | `18 / 34` | 学習進度表示 |
| 作业完成 | `homeworkCompleted` / `homeworkTotal` | `number` | `19 / 22` | 作业進度表示 |
| 待补课 | `pendingMakeups` | `number` | `2` | 補課件数表示 |
| 等级 | `demo.student.level` | `string` | `初级` | 学習段階表示 |

## 入力パラメータ表
| キー | 型 | 必須 | 供給元 | 用途 |
| --- | --- | --- | --- | --- |
| `demo.learningArchive.summary` | `object` | はい | `getDemoData()` | 学習概要表示 |
| `demo.student.level` | `string` | はい | `getDemoData()` | バッジ表示 |

## 操作項目表
| 操作対象 | 表示 | 操作可否 | イベント |
| --- | --- | --- | --- |
| Hero 全体 | 概要情報 | 不可 | なし |

## 状態連動表
| 関連 state | 影響 |
| --- | --- |
| `homeworkSubmitted` | 作业完成表示に間接影響 |
| `purchasedCourseIds` | 课程進度範囲の増加に将来影響 |

## データ流入元 / 流出先
| 種別 | 内容 |
| --- | --- |
| 流入元 | `services/demo-service.getDemoData()` |
| 流出先 | なし |
