# 共有 Accessibility Controls

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-SHARED-003` |
| 控件名 | Accessibility Controls |
| 種別 | 共有操作控件 |
| 実装元 | `templates/accessibility.wxml` |
| 挙動供給 | `behaviors/with-accessibility.js` |

## 責務

この控件は全ページ共通のアクセシビリティ操作を提供します。

責務:
- 文字・表示サイズ縮小
- 文字・表示サイズ拡大
- demo リセット

## ボタン一覧

| 表示 | イベント | 条件 | 更新先 |
| --- | --- | --- | --- |
| `↻` | `resetDemo` | `showReset === true` の時だけ表示 | `kotobalink-demo-state` |
| `A-` | `decreaseAccessibility` | `accessibility.canDecrease === true` | `kotobalink-accessibility-level` |
| `A+` | `increaseAccessibility` | `accessibility.canIncrease === true` | `kotobalink-accessibility-level` |

## 入力データ

| キー | 型 | 必須 | 供給元 | 用途 |
| --- | --- | --- | --- | --- |
| `accessibility.level` | `number` | はい | `getAccessibilitySettings()` | レベル切替 |
| `accessibility.canDecrease` | `boolean` | はい | `getAccessibilitySettings()` | `A-` の活性制御 |
| `accessibility.canIncrease` | `boolean` | はい | `getAccessibilitySettings()` | `A+` の活性制御 |
| `showReset` | `boolean` | いいえ | 各ページの template data | `↻` 表示制御 |

## 状態連動

### 表示倍率連動

1. `A-` / `A+` を押す
2. `shiftLevel(delta)` 実行
3. `kotobalink-accessibility-level` 更新
4. `refreshAccessibility()` 実行
5. `accessibility.pageScaleStyle` 更新
6. ページ全体の表示倍率とフォントサイズが変わる

### demo リセット連動

1. `↻` を押す
2. 各ページ実装の `resetDemo()` 実行
3. `resetDemoState()` 実行
4. `kotobalink-demo-state` が初期値に戻る
5. ページ `refresh()` 実行

## 依存ファイル

- `templates/accessibility.wxml`
- `behaviors/with-accessibility.js`
- `store/accessibility-store.js`
- 各ページの `resetDemo()` 実装
