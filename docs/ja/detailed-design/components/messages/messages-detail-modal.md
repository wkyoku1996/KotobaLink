# 消息 详情弹层

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-MSG-004` |
| 実装元 | `pages/tab/messages/index.wxml` / `index.js` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 类型 | `activeMessage.type` | `string` | `教师消息` |
| 时间 | `activeMessage.time` | `string` | `2026-03-16 16:10` |
| 重要标签 | `activeMessage.important` | `boolean` | `true` |
| 标题 | `activeMessage.title` | `string` | `佐藤老师发布了...` |
| 发送者 | `activeMessage.sender` | `string` | `佐藤老师` |
| 正文 | `activeMessage.summary` | `string` | `本次测验主要错点...` |

## 入力パラメータ表
| キー | 型 | 必須 | 供給元 |
| --- | --- | --- | --- |
| `activeMessage` | `object|null` | はい | `openMessage()` |
| `showMessageDetail` | `boolean` | はい | ローカル state |

## 操作項目表
| 操作対象 | 表示 | イベント | 処理 |
| --- | --- | --- | --- |
| 遮罩 | 外层区域 | `closeMessageDetail` | 弹层关闭 |
| 按钮 | `我知道了` | `closeMessageDetail` | 弹层关闭 |
