# 共有 Accessibility Controls

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-SHARED-003` |
| 種別 | 共有操作コンポーネント |
| 実装元 | `templates/accessibility.wxml` / `store/accessibility-store.js` |

## 責務

このコンポーネントは、フォント倍率や表示補助レベルなどの miniapp 内表示支援設定を切り替える共通操作です。業務データではなく表示設定を管理します。

## backend データ要求

現行 demo では local store で完結しています。正式版で端末間同期が必要な場合のみ、ユーザー表示設定保存 API を追加対象とします。

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 表示設定取得 | `GET` | `/api/v1/students/{studentId}/preferences/accessibility` |
| 表示設定更新 | `PUT` | `/api/v1/students/{studentId}/preferences/accessibility` |

## 実装メモまたは移行メモ

- 端末ローカル優先なら backend 不要
- アカウント跨ぎ同期が必要な場合のみ API 化する
