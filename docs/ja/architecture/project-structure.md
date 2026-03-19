# プロジェクト構造ブループリント

## 目標

長期並行開発を支えるリポジトリ構造を維持し、以下を対象にします。
- WeChat ミニアプリ
- Web フロントエンド
- 管理画面
- バックエンドサービス
- 共有業務モデル、API 契約、開発ツール

## 目標トップレベル構造

```text
root/
  apps/
    miniapp/
    web/
    admin/
    backend/
  packages/
    shared/
    types/
    api-client/
    ui/
    config/
  docs/
    architecture/
    product/
    api/
    ops/
  infra/
  scripts/
  tests/
  legacy/
```

## 主要ルール

- `apps/*` は独立構築・独立配置されるアプリを表します
- `packages/*` は複数アプリで共有するコードを表します
- `docs/` は構造化されたプロジェクト文書を表します
- 新しいミニアプリ業務コードをリポジトリルートに置きません
