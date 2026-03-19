# 共有 Hero Card

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-SHARED-001` |
| 種別 | 共有レイアウトコンポーネント |
| 実装元 | `apps/miniapp/app.wxss` |

## 責務

Hero Card はページ冒頭の見出し領域を統一する共有レイアウトです。自身は business data を持たず、親ページや親コンポーネントから渡される表示情報を包むだけです。

## backend データ要求

この共有コンポーネント自体に直接対応する backend エンティティや API はありません。実際の backend/API 要求は利用先コンポーネント側で定義します。

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| なし | - | - |

## 実装メモまたは移行メモ

- 正式版でも shared layout として維持可能
- backend/API 設計は利用先の Hero Summary 文書で定義する
