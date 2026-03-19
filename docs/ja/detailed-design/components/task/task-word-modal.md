# 任务 词汇弹层

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-TASK-004` |
| 実装元 | `pages/tab/task/index.wxml` / `index.js` |
| 控件类型 | 弹层控件 |

## 表示フィールド表
| 表示名 | キー | 型 | 例 |
| --- | --- | --- | --- |
| 标签 | 固定文言 | `string` | `今日词汇卡片` |
| 単語 | `activeWord.word` | `string` | `駅` |
| 読み | `activeWord.reading` | `string` | `えき` |
| 意味 | `activeWord.meaning` | `string` | `车站` |
| 例句 | `activeWord.example` | `string` | `駅で友だちと...` |

## 入力パラメータ表
| キー | 型 | 必須 | 供給元 |
| --- | --- | --- | --- |
| `activeWord` | `object|null` | はい | `openWordCard()` |
| `showWordModal` | `boolean` | はい | ローカル state |

## 操作項目表
| 操作対象 | 表示 | イベント | 処理 |
| --- | --- | --- | --- |
| 遮罩 | 外层区域 | `closeWordCard` | 弹层关闭 |
| 主按钮 | `标记为已学习` / `我已学完，关闭卡片` | `markWordLearned` | `learnedVocabIds` 更新 |
| 次按钮 | `稍后再看` | `closeWordCard` | 弹层关闭 |

## 状態連動表
| 関連 state | 影響 |
| --- | --- |
| `learnedVocabIds` | 学習済み更新後、一覧と打卡状态に連動 |
