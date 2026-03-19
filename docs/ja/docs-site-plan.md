# 文書サイト計画

## 現在の状態

プロジェクト文書は現在 `docs/` 配下の Markdown を基準に管理しています。

## 文書サイトを導入する条件

以下のいずれかが成立した時点で HTML 文書サイト化を行います。
- 複数メンバーがブラウザベースの統一入口を必要とする
- 製品、バックエンド、管理画面文書が増加する
- バージョン管理文書や外部共有が必要になる
- リポジトリのオンボーディング入口を明確化する必要がある

## 現在の実装

現在の文書サイトは VitePress を使用します。

## 現在の構造

```text
docs/
  .vitepress/
    config.mts
  index.md
  project-overview.md
  page-inventory.md
  data-architecture.md
  development-guide.md
  architecture/
```
