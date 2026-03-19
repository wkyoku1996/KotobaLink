# 首页ページ設計

## 基本情報

| 項目 | 内容 |
| --- | --- |
| ページ ID | `PAGE-HOME-001` |
| ページ名 | 首页 |
| 実装パス | `apps/miniapp/pages/tab/home/` |
| 画面入口 | TabBar `首页` |
| 主要データ入口 | `getDemoData()` / `getProfileGrowthData()` |

## ページ責務

首页は、学習者の現在状態を 1 画面で要約し、主要導線へ分岐させるページです。

この文書ではページ全体の構成と初期化順のみを記述します。
各控件の字段、参数、ボタン、状態連動は各控件文書を参照します。

## 控件構成

| 表示順 | 控件 ID | 控件名 | 役割 |
| --- | --- | --- | --- |
| 1 | `CMP-HOME-001` | 首页 Hero Summary | 学習者の基本情報、课程状态、会员状态、等级表示 |
| 2 | `CMP-HOME-002` | 首页 Skill Radar | 能力維度比較、現在値、前回値、増減表示 |
| 3 | `CMP-HOME-003` | 首页 Upcoming Schedule | 近期课程の要約表示 |
| 4 | `CMP-HOME-004` | 首页 Activity Entry | 活动入口表示 |
| 5 | `CMP-HOME-005` | 首页 Daily Task | 今日任务の要約表示 |
| 6 | `CMP-SHARED-003` | Accessibility Controls | demo リセット、文字サイズ変更 |

## データ初期化順

| 手順 | 処理 |
| --- | --- |
| 1 | `onShow()` で `refresh()` を呼ぶ |
| 2 | `getDemoData()` で demo 全体データ取得 |
| 3 | `getProfileGrowthData()` で成長データ取得 |
| 4 | `buildRadarComparison()` で比較用データ生成 |
| 5 | `buildUpcomingSchedule()` で首页課表要約生成 |
| 6 | `setData()` で `demo` / `growth` / `upcomingSchedule` 更新 |
| 7 | `drawSkillRadar()` で radar canvas 描画 |
