# 课程 我的课程列表

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-COURSE-002` |
| 実装元 | `pages/tab/course/index.wxml` / `index.js` |
| 直接依存 service | `getDemoData()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| セクションタイトル | 固定文言 | `string` | `我的课程` | 見出し |
| 课程名 | `item.courseName` | `string` | `日语初级精品班` | 课程識別 |
| 班级 + 教师 | `item.className` / `item.teacher` | `string` | `2026 春季 1 班 · 山田老师` | 補足情報 |
| 服务状态 | `item.serviceStatus` | `string` | `服务中` | 当前状态 |
| 空文言 | 固定文言 | `string` | `您还没有报名的课程。` | 空状態表示 |

## 入力パラメータ表
| キー | 型 | 必須 | 供給元 | 加工 |
| --- | --- | --- | --- | --- |
| `enrolledCourses` | `Array` | はい | `demoData.learningArchive.enrolledCourses` | なし |

## 操作項目表
| 操作対象 | 表示 | 発火条件 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- | --- | --- |
| 一覧項目 | 课程卡片 | `enrolledCourses.length > 0` | `goToEnrolledCourseDetail` | `data-id` 取得 | `/pages/account/profile-course-detail/index?id=*` |

## 出力イベント表
| イベント | 更新状態 | 影響先 |
| --- | --- | --- |
| `goToEnrolledCourseDetail` | なし | 已报名课程详情頁 |

## 状態連動表
| 関連 state | 影響 |
| --- | --- |
| `purchasedCourseIds` | 新购课程がこの一覧へ移動 |

## データ流入元 / 流出先
| 種別 | 内容 |
| --- | --- |
| 流入元 | `getDemoData()` |
| 流出先 | 已报名课程详情頁 |
