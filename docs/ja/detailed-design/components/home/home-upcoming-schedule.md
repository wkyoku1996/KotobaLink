# 首页 Upcoming Schedule

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-HOME-003` |
| 控件名 | 首页 Upcoming Schedule |
| 実装元 | `pages/tab/home/index.wxml` / `pages/tab/home/index.js` |
| スタイル基底 | `CMP-SHARED-002` |
| 直接依存 service | `getDemoData()` / `getDemoToday()` |
| 中間加工関数 | `buildUpcomingSchedule()` |

## 責務

この控件は、今日または最も近い课程予定を首页に要約表示し、完整课表への導線を提供します。

この控件が扱う範囲:
- `demo.schedule` から首页用の近期课程を抽出
- 日期ラベルを生成
- 课程 0 件時は空状態を表示
- `查看课表` ボタンから课表頁へ遷移

この控件が扱わない範囲:
- 完整课表の一覧表示
- 课程項目クリック時の详情遷移
- schedule 元データの永続化

## 表示構造

1. セクションタイトル
2. 日期ラベル付きサブタイトル
3. 近期课程一覧、または空状態カード
4. `查看课表` ボタン

## 表示フィールド表

| 領域 | 表示名 | キー | 型 | 例 | 用途 | 空値時 |
| --- | --- | --- | --- | --- | --- | --- |
| セクション | タイトル | 固定文言 | `string` | `课程予定` | 控件見出し | 固定表示 |
| セクション | 日期ラベル | `upcomingSchedule.dateLabel` | `string` | `3/18 周三` | 表示対象日の識別 | `暂无课程安排` |
| 一覧 | 開始時刻 | `item.startTime` | `string` | `20:00` | 時間表示 | 空表示不可 |
| 一覧 | 終了時刻 | `item.endTime` | `string` | `21:30` | 時間表示 | 空表示不可 |
| 一覧 | 课时标题 | `item.title` | `string` | `N4 语法专项 1` | 课程識別 | タイトル欠落 |
| 一覧 | コース名 | `item.courseName` | `string` | `JLPT N4 冲刺班` | 所属课程表示 | `list-meta` 前半欠落 |
| 一覧 | クラス名 | `item.className` | `string` | `2026 冲刺 A 班` | 班级表示 | `list-meta` 後半欠落 |
| 一覧 | 教師 | `item.teacher` | `string` | `佐藤老师` | 授課者表示 | 教師名欠落 |
| 一覧 | 状态 | `item.status` | `string` | `今晚开课` | 当前进度表示 | 状態欠落 |
| 空状態 | 空タイトル | 固定文言 | `string` | `近期暂无课程` | 空状態通知 | 表示固定 |
| 空状態 | 空説明 | 固定文言 | `string` | `可以进入完整课表查看所有课程安排。` | 補足説明 | 表示固定 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 加工 | 用途 |
| --- | --- | --- | --- | --- | --- |
| `demo.schedule` | `Array` | はい | `getDemoData()` | `buildUpcomingSchedule()` | 元课程データ |
| `upcomingSchedule.dateLabel` | `string` | はい | `buildUpcomingSchedule()` | なし | セクション副題 |
| `upcomingSchedule.courses` | `Array` | はい | `buildUpcomingSchedule()` | `startTime` 昇順 | 一覧表示 |

## 操作項目表

| 操作対象 | 表示 | 発火条件 | 無効条件 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- | --- | --- | --- |
| CTA ボタン | `查看课表` | 常時 | なし | `goSchedule` | `wx.navigateTo(...)` | `/pages/learning/schedule/index` |

## 出力イベント表

| イベント | 発火元 | 更新状態 | 影響先 |
| --- | --- | --- | --- |
| `goSchedule` | CTA ボタン | なし | 课表頁遷移 |

## 状態連動表

| 関連 state | 利用箇所 | 影響 |
| --- | --- | --- |
| `activitySignedUp` | 間接 | schedule に活动項目が追加された場合、最近课程結果が変化 |
| `purchasedCourseIds` | 間接 | 将来 purchase 後课程が schedule に入る場合、結果が変化 |

## データ流入元 / 流出先

| 種別 | 内容 |
| --- | --- |
| 直接流入元 | `services/demo-service.getDemoData()` |
| 中間加工 | `buildUpcomingSchedule()` |
| 流出先 | `goSchedule` により课表頁へ遷移 |

## `buildUpcomingSchedule()` 処理詳細

| 手順 | 処理 |
| --- | --- |
| 1 | `getDemoToday()` で demo 基準日の `todayKey` を取得 |
| 2 | `schedule` から `todayKey` 一致項目を抽出 |
| 3 | 今日の课程がなければ未来课程を日付昇順で抽出 |
| 4 | 最も近い 1 件を `upcomingCourses` に設定 |
| 5 | `dateLabel` を `M/D 曜日` 形式で生成 |
| 6 | `startTime` 昇順で再ソートして返却 |

## 例外条件表

| 条件 | 現在挙動 |
| --- | --- |
| `demo.schedule` が空 | 空状態カード表示 |
| 今日の课程がない | 未来课程の最初の 1 件を表示 |
| 未来课程もない | `dateLabel = 暂无课程安排`、一覧 0 件 |

## 実 API 化時の置換

- `GET /schedule/week`
- `GET /schedule/day`

首页表示用の最近课程抽出ロジックは、実 API 化後も frontend selector として維持可能です。
