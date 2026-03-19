# ホーム Skill Radar

## 基本情報
| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-HOME-002` |
| 実装元 | `pages/tab/home/index.wxml` / `index.js` |
| 中間加工関数 | レーダーチャート描画処理 |

## 責務
ホームで主要能力軸の現在値を可視化する概要レーダーです。マイページの詳細版に対する要約表示として機能します。

## backend データ要求
主な backend エンティティ: `SkillDimension`, `StudentSkillSnapshot`

## 想定 API 一覧
| 用途 | Method | Path |
| --- | --- | --- |
| ホーム用能力要約取得 | `GET` | `/api/v1/students/{studentId}/home/skill-summary` |

## API フィールド対応表
| 画面フィールド | 想定 response フィールド |
| --- | --- |
| 軸ラベル | `dimensions[].label` |
| 現在値 | `dimensions[].score` |
