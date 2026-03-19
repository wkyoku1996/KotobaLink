# 任务 词汇列表

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-TASK-002` |
| 実装元 | `pages/tab/task/index.wxml` / `index.js` |
| 直接依存 service | `getDemoData()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| 词汇 | `item.word` | `string` | `駅` | 語彙表示 |
| 读音 | `item.reading` | `string` | `えき` | 読み表示 |
| 释义 | `item.meaning` | `string` | `车站` | 意味表示 |
| 已学习标签 | `item.learned` | `boolean` | `true` | 学習済み表示 |

## 入力パラメータ表
| キー | 型 | 必須 | 供給元 |
| --- | --- | --- | --- |
| `demo.dailyTask.vocab` | `Array` | はい | `getDemoData()` |

## 操作項目表
| 操作対象 | 表示 | イベント | 処理 |
| --- | --- | --- | --- |
| 词汇卡片 | 单词 + 释义 | `openWordCard` | `data-id` で activeWord 設定 |

## 状態連動表
| 関連 state | 影響 |
| --- | --- |
| `learnedVocabIds` | `item.learned` と status-pill 表示に反映 |
