# 任务 Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-TASK-001` |
| 実装元 | `pages/tab/task/index.wxml` |
| 直接依存 service | `getDemoData()` |

## 表示フィールド表
| 表示名 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- |
| タイトル | 固定文言 | `string` | `今日词汇打卡` | 見出し |
| 説明文 | `demo.dailyTask.intro` | `string` | `完成 5 个今日词汇学习后...` | 今日任务概要 |

## 入力パラメータ表
| キー | 型 | 必須 | 供給元 |
| --- | --- | --- | --- |
| `demo.dailyTask.intro` | `string` | はい | `getDemoData()` |
