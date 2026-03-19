# 我的 能力画像

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-PROFILE-005` |
| 実装元 | `pages/tab/profile/index.wxml` / `index.js` |
| 中間加工関数 | `buildRadarComparison()` / `drawSkillRadar()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 轴标签 | `growth.skillRadar[].label` | `string` | `会话表达` |
| 当前值 | `item.scoreText` | `string` | `84` |
| 之前值 | `item.previousScore` | `number` | `68` |
| 差分 | `item.deltaText` | `string` | `+16` |

## 状態連動表
| 関連 state | 影響 |
| --- | --- |
| なし | growth データのみ依存 |
