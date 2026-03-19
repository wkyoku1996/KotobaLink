# 我的 成绩趋势

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-PROFILE-004` |
| 実装元 | `pages/tab/profile/index.wxml` / `index.js` |
| 中間加工関数 | `buildTrendBars()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 阶段标签 | `item.label` | `string` | `第 8 周` |
| 课堂柱高 | `item.lessonHeight` | `string` | `144rpx` |
| 作业柱高 | `item.homeworkHeight` | `string` | `151rpx` |
| 小测柱高 | `item.quizHeight` | `string` | `142rpx` |

## データ流れ
| 手順 | 処理 |
| --- | --- |
| 1 | `getProfileGrowthData()` |
| 2 | `buildTrendBars()` |
| 3 | `growth.scoreTrend` に格納 |
| 4 | WXML 柱状表示 |
