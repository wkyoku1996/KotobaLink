# ホーム Activity Entry

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-HOME-004` |
| 実装元 | `pages/tab/home/index.wxml` / `index.js` |
| 関連イベント | 活動ページ遷移イベント |

## 責務
ホームからイベント詳細へ入るための要約入口です。イベント名、状態、日時などの抜粋情報を表示します。

## backend データ要求
主な backend エンティティ: `Activity`, `ActivityRegistration`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| ホーム用イベント要約取得 | `GET` | `/api/v1/students/{studentId}/home/activity-highlight` |

## API フィールド対応表
| 画面フィールド | 想定 response フィールド |
| --- | --- |
| タイトル | `activity.title` |
| 状態 | `registration.statusLabel` |
| 日時 | `activity.timeLabel` |
