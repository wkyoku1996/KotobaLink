# 消息 分类筛选

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-MSG-002` |
| 実装元 | `pages/tab/messages/index.wxml` / `index.js` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| 分类文言 | `item.label` | `string` | `系统消息` | 分类識別 |
| 件数 | `item.count` | `number` | `2` | 件数表示 |
| 激活状态 | `activeFilter === item.key` | `boolean` | `true` | active 表示 |

## 操作項目表
| 操作対象 | 表示 | イベント | 処理 |
| --- | --- | --- | --- |
| 筛选 chip | `label (count)` | `switchFilter` | `activeFilter` と `visibleMessages` 更新 |
