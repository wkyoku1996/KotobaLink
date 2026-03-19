# 開発ガイド

## 文書範囲

本書は、現在のリポジトリにおける開発入口、ディレクトリ規則、文書更新規則のみを記載します。

機能詳細、ページ設計、状態連動は本書では重複記載せず、構造文書と詳細設計文書を参照します。

## 現在の開発入口

| 項目 | 位置 |
| --- | --- |
| リポジトリルート | `KotobaLink/` |
| WeChat 工程入口 | リポジトリルート |
| miniapp ソース | `apps/miniapp/` |
| miniapp ルート設定 | `project.config.json` |
| 文書サイト | `docs/` |

## コード配置規則

| 内容 | ディレクトリ |
| --- | --- |
| miniapp ページ | `apps/miniapp/pages/` |
| demo 仮データ | `apps/miniapp/mock/` |
| ローカル状態と永続化 | `apps/miniapp/store/` |
| ページ向け取得ロジック | `apps/miniapp/services/` |
| miniapp 設定 | `apps/miniapp/config/` |
| 安定したデータ契約 | `packages/types/` |
| 再利用可能な純関数 | `packages/shared/` |

## 現在の制約

- 新規ページは `apps/miniapp/app.json` に登録する
- `apps/` の外にアプリケーションコードを追加しない
- `apps/miniapp/utils/` に新規業務ロジックを追加しない
- ページから `mock/` を直接参照しない
- `wx.*` に依存する処理は共有パッケージへ移さない
- `pages/legacy/` は正式業務ディレクトリとして扱わない

## 文書更新規則

| 変更内容 | 更新対象 |
| --- | --- |
| ページ範囲の変更 | `docs/ja/page-inventory.md`、詳細設計ページ文書 |
| コンポーネントのフィールド・操作変更 | 対応する詳細設計コンポーネント文書 |
| 状態やデータ源の変更 | `docs/ja/data-architecture.md`、対応する詳細設計コンポーネント文書 |
| リポジトリ構造の変更 | `docs/ja/architecture/current-stable-baseline.md`、`apps/miniapp/README.md` |

## 関連文書

- [ページ一覧](./page-inventory.md)
- [データ構成](./data-architecture.md)
- [現在の安定基線](./architecture/current-stable-baseline.md)
- `docs/ja/detailed-design/`
