# マイページ スキルレーダー

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-005` |
| 実装元 | `pages/tab/profile/index.wxml` / `index.js` |
| 中間加工関数 | `buildRadarComparison()` / `drawSkillRadar()` |
| 直接依存 service | `getProfileGrowthData()` |

## 責務

このコンポーネントは、複数能力軸における当前能力、之前阶段、差分を可視化します。canvas 描画と数値一覧を同時に持つため、表示ロジックと加工ロジックの両方を含みます。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 轴标签 | `growth.skillRadar[].label` | `string` |
| 当前值 | `item.scoreText` | `string` |
| 之前值 | `item.previousScore` | `number` |
| 差分 | `item.deltaText` | `string` |

## backend データ要求

主な backend エンティティ:
- `SkillDimension`
- `StudentSkillSnapshot`
- `StudentSkillHistory`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| 能力画像取得 | `GET` | `/api/v1/students/{studentId}/growth/skill-radar` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `label` | `dimension.label` |
| `scoreText` | `current.score` |
| `previousScore` | `previous.score` |
| `deltaText` | frontend で差分計算 |

## 実装メモまたは移行メモ

- canvas 描画は frontend 固有処理として残る
- backend は現在値と比較対象値を返せばよい
