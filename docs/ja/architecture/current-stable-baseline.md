# 現在の安定基線

## リポジトリルート

現在のリポジトリは複数アプリ向けワークスペースとして構成されています。

```text
KotobaLink/
  apps/
    miniapp/
  packages/
    shared/
    types/
  docs/
  infra/
  scripts/
  tests/
  package.json
  pnpm-workspace.yaml
  project.config.json
  project.private.config.json
```

## WeChat ミニアプリ入口

- WeChat DevTools は `KotobaLink` ルートを開く
- ミニアプリルートは `project.config.json` で設定する
- `miniprogramRoot` は `apps/miniapp/` を指す

## Miniapp 内部境界

現在の `apps/miniapp/` では以下の責務分割を採用しています。

- `pages/`: 業務ドメイン別のページ入口
- `services/`: ページ向けデータアクセス入口
- `store/`: ローカル状態と永続化
- `mock/`: demo 仮データと組み立てロジック
- `config/`: demo 定数とローカル設定
- `behaviors/`: 再利用可能な behavior
- `templates/`: 共通 WXML 断片
- `utils/`: 互換層用途のみ
