# ホーム Hero Summary

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-HOME-001` |
| 実装元 | `pages/tab/home/index.wxml` |
| 直接依存 service | `getDemoData()` |

## 責務
学員の氏名、受講中コース、現在レベルをホーム冒頭で提示する要約ヘッダーです。

## 表示フィールド表
| 表示名 | キー | 型 |
| --- | --- | --- |
| 氏名 | `demo.student.name` | `string` |
| コース名 | `demo.student.course` | `string` |
| レベル | `demo.student.level` | `string` |

## backend データ要求
主な backend エンティティ: `Student`, `Enrollment`, `Membership`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| ホームヘッダー取得 | `GET` | `/api/v1/students/{studentId}/home/header` |

## API フィールド対応表
| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `demo.student.name` | `student.displayName` |
| `demo.student.course` | `currentEnrollment.courseName` |
| `demo.student.level` | `student.levelLabel` |
