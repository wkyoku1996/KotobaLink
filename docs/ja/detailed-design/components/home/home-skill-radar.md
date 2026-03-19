# 首页 Skill Radar

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-HOME-002` |
| 控件名 | 首页 Skill Radar |
| 実装元 | `pages/tab/home/index.wxml` / `pages/tab/home/index.js` / `pages/tab/home/index.wxss` |
| スタイル基底 | `CMP-SHARED-002` |
| 直接依存 service | `getProfileGrowthData()` |
| canvas ID | `homeSkillRadar` |

## 責務

能力维度画像控件は、学習者の現在能力と前段階能力を比較表示するための控件です。

## 表示フィールド表

| 領域 | 表示項目 | キー | 型 | 例 | 用途 |
| --- | --- | --- | --- | --- | --- |
| セクション | タイトル | 固定文言 | `string` | `能力维度画像` | 控件見出し |
| セクション | 説明文 | 固定文言 | `string` | `根据课堂表现...` | 控件補足 |
| 凡例 | 現在能力 | 固定文言 | `string` | `当前能力` | 色意味表示 |
| 凡例 | 之前阶段 | 固定文言 | `string` | `之前阶段` | 色意味表示 |
| 軸ラベル | 軸名 | `item.label` | `string` | `会话表达` | radar 軸名 |
| 指標行 | 前回値 | `item.previousScore` | `number` | `68` | 比較値 |
| 指標行 | 現在値 | `item.scoreText` | `string` | `84` | 現在値表示 |
| 指標行 | 差分 | `item.deltaText` | `string` | `+16` | 増減表示 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 加工 | 用途 |
| --- | --- | --- | --- | --- | --- |
| `growth.skillRadar` | `Array` | はい | `getProfileGrowthData()` | `buildRadarComparison()` | 現在能力表示 |
| `growth.previousSkillRadar` | `Array` | はい | `getProfileGrowthData()` | 比較元 | 前回能力比較 |
| `growth.skillRadar[].score` | `number` | はい | `getProfileGrowthData()` | polygon 計算 | 面積描画 |
| `growth.skillRadar[].label` | `string` | はい | `getProfileGrowthData()` | なし | 軸ラベル表示 |

## 操作項目表

| 操作対象 | 表示 | 操作可否 | イベント | 備考 |
| --- | --- | --- | --- | --- |
| radar canvas | 能力図形 | 不可 | なし | 表示専用 |
| 軸ラベル | 5 軸名 | 不可 | なし | 表示専用 |
| スキル行 | 数値行 | 不可 | なし | 表示専用 |

## 出力イベント表

この控件から外部へ発火するイベントはありません。

## 描画処理表

| 手順 | 処理 |
| --- | --- |
| 1 | `refresh()` 後に `setTimeout(... drawSkillRadar)` |
| 2 | `createSelectorQuery()` で canvas rect を取得 |
| 3 | `wx.createCanvasContext('homeSkillRadar')` |
| 4 | 背景リング描画 |
| 5 | 軸線描画 |
| 6 | 前回 polygon 描画 |
| 7 | 現在 polygon 描画 |
| 8 | `ctx.draw()` |

## 状態連動表

| 関連 state | 現在利用 | 影響 |
| --- | --- | --- |
| demo state 各種 | なし | この控件は growth データのみ参照 |

## データ流入元 / 流出先

| 種別 | 内容 |
| --- | --- |
| 直接流入元 | `services/demo-service.getProfileGrowthData()` |
| 中間加工 | `buildRadarComparison()` |
| 描画処理 | `drawSkillRadar()` / `drawRadarToCanvas()` |
| 流出先 | なし |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `growth` がない | セクション全体非表示 |
| `growth.skillRadar` が空 | `drawSkillRadar()` を中断 |
| rect 未取得 | サイズ `420` を使用 |

## 実 API 化時の置換

- `GET /students/growth/radar`
- `GET /students/growth/trend`

将来は canvas データを backend ではなく frontend で引き続き組み立てる想定です。
