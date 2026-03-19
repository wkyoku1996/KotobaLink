# メッセージ 分類フィルタ

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-MSG-002` |
| 実装元 | `pages/tab/messages/index.wxml` / `index.js` |
| 関連イベント | `switchFilter` |
| 関連 state | `activeFilter` |

## 責務

メッセージ一覧の表示対象カテゴリを切り替えます。`all` と各分类 key の間で `visibleMessages` の再計算を発生させます。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| ラベル | `item.label` | `string` |
| 件数 | `item.count` | `number` |
| フィルタキー | `item.key` | `string` |

## 操作項目表

| 操作対象 | イベント | 処理 |
| --- | --- | --- |
| フィルタチップ | `switchFilter` | `activeFilter` 更新、`visibleMessages` 再計算 |
