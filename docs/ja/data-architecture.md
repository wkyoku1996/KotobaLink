# データ構成

## 現在の原則

現在のプロジェクトでは、ミニアプリ内部のデータ責務を分離しつつ、今後の複数端末開発向けに共有層を保持します。

## 現在のレイヤー

### `apps/miniapp/mock`

用途:
- demo 用の仮データ
- 画面表示用シードデータ
- demo 組み立て入力

現在の説明:
- この層は demo データの意味を保持します
- この層はミニアプリの local storage 操作を扱いません

### `apps/miniapp/store`

用途:
- local storage 永続化
- storage ベースの状態
- ミニアプリ内の状態更新ロジック

例:
- demo 状態の保存
- アクセシビリティ設定状態

### `apps/miniapp/services`

用途:
- ページ向けのデータ入口
- `mock/` と `store/` の調整
- selector と問い合わせ関数の提供

現在のルール:
- ページは `services/*` を優先して使用します
- ページは `mock/` を直接読み取りません

### `apps/miniapp/config`

用途:
- ミニアプリのローカル定数
- demo の既定設定
- storage key
- デモ日付アンカー

### `packages/types`

用途:
- 安定したデータ契約
- 共有フィールド定義
- 状態列挙

### `packages/shared`

用途:
- 複数端末で再利用できる純関数
- `wx.*` に依存しない処理
- storage の読み書きを行わない処理

## 現在共有していない内容

以下は現在もミニアプリ内に保持しています。
- ページ view model
- 画面遷移処理
- storage ベースの glue logic
- demo 固有の表示ロジック
- アクセシビリティ behavior
