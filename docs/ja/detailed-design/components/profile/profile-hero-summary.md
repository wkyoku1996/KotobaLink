# 我的 Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-PROFILE-001` |
| 実装元 | `pages/tab/profile/index.wxml` / `index.js` |
| 直接依存 service | `getDemoData()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 姓名 | `demo.student.name` | `string` | `小林美咲` |
| 当前课程 | `demo.student.course` | `string` | `日语初级精品班` |
| 班级 | `demo.student.className` | `string` | `2026 春季 1 班` |
| 等级 | `demo.student.level` | `string` | `初级` |
| 服务有效期 | `demo.student.renewal` | `string` | `当前服务有效期至...` |

## 操作項目表
| 操作対象 | 表示 | イベント | 遷移先 |
| --- | --- | --- | --- |
| 会员按钮 | `会员中心` | `goMembership` | `/pages/account/membership/index` |
