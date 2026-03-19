# 共有層抽出計画

## 目標

リポジトリをミニアプリ内 utility 集約型から、再利用可能な共有パッケージ型へ段階的に移行します。

## 現在の問題

`apps/miniapp/utils/demo-data.js` には以下の責務が混在していました。
- 基本 mock データ
- ローカル状態永続化
- 日付処理
- 純マッピング関数
- ページ向け selector
- ドメイン投影ロジック

## 移行先

### `packages/types`

安定契約:
- student
- teacher
- course
- enrolled course
- lesson
- assessment
- notification
- membership plan
- activity
- payment order
- demo state

### `packages/shared`

純ロジック:
- `formatDateKey`
- 週範囲処理
- 時間割並び替え
- スコア変換
- メッセージ並び替え
- course と lesson のマッピング
