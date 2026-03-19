# 開発ガイド

## 現在の開発入口

ミニアプリを開発する場合は以下の入口を使います。

1. WeChat DevTools で `KotobaLink` リポジトリルートを開く
2. ミニアプリソースは `project.config.json` から読み込まれる
3. `miniprogramRoot` は `apps/miniapp/` を指す

## 現在の開発ルール

### ミニアプリページを追加する場合

- ページは `apps/miniapp/pages/` 配下の対応ドメインに配置する
- 有効化するページは `apps/miniapp/app.json` に登録する
- 新規ページをリポジトリルートに置かない

### データロジックを追加する場合

- demo 仮データは `apps/miniapp/mock/`
- storage とローカル状態は `apps/miniapp/store/`
- ページ向け取得ロジックは `apps/miniapp/services/`
- ミニアプリ設定は `apps/miniapp/config/`

### 共有ロジックを追加する場合

- 安定したデータ契約は `packages/types/`
- 再利用可能な純関数は `packages/shared/`
- `wx.*` に依存する処理は共有パッケージに置かない
