# 首页 Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| 控件 ID | `CMP-HOME-001` |
| 控件名 | 首页 Hero Summary |
| 実装元 | `pages/tab/home/index.wxml` |
| スタイル基底 | `CMP-SHARED-001` |
| 直接依存 service | `getDemoData()` |

## 責務

首页 Hero Summary は、学習者の現在状態を最初に把握させるための要約控件です。

## 表示構造

1. 主タイトル `你好，\{\{demo.student.name\}\}`
2. サブタイトル `\{\{demo.student.course\}\}`
3. バッジ 3 個

## 表示フィールド表

| 表示名 | キー | 型 | 例 | データ元 | 用途 |
| --- | --- | --- | --- | --- | --- |
| 挨拶タイトル | `demo.student.name` | `string` | `小林美咲` | `BASE_DATA.student.name` | 現在ユーザー識別 |
| 受講中コース | `demo.student.course` | `string` | `日语初级精品班` | `BASE_DATA.student.course` | 主たる受講サービス表示 |
| 状态バッジ 1 | 固定文言 | `string` | `课程服务中` | WXML 固定値 | 课程服务状態表示 |
| 状态バッジ 2 | 固定文言 | `string` | `会员权益中` | WXML 固定値 | 会员状態表示 |
| 等级バッジ | `demo.student.level` | `string` | `初级` | `BASE_DATA.student.level` | 学習段階表示 |

## 入力パラメータ表

| キー | 型 | 必須 | 供給元 | 加工 | 用途 |
| --- | --- | --- | --- | --- | --- |
| `demo.student.name` | `string` | はい | `getDemoData()` | なし | タイトル表示 |
| `demo.student.course` | `string` | はい | `getDemoData()` | なし | サブタイトル表示 |
| `demo.student.level` | `string` | はい | `getDemoData()` | なし | バッジ表示 |

## 操作項目表

| 操作対象 | 表示文言 | 操作可否 | イベント | 備考 |
| --- | --- | --- | --- | --- |
| 主タイトル | `你好，...` | 不可 | なし | 表示のみ |
| サブタイトル | 课程名 | 不可 | なし | 表示のみ |
| バッジ群 | 固定文言 / 等级 | 不可 | なし | 表示のみ |

## 出力イベント表

この控件自体には押下イベントはありません。

## 状態連動表

| 関連 state | 現在利用 | 影響 |
| --- | --- | --- |
| `purchasedCourseIds` | 間接 | 将来、课程服务状態表示に利用可能 |
| `lastPurchasedCourseId` | 間接 | 将来、最近购买课程表示に利用可能 |
| `activitySignedUp` | なし | この控件には未接続 |
| `dailyTaskCompleted` | なし | この控件には未接続 |

## データ流入元 / 流出先

| 種別 | 内容 |
| --- | --- |
| 直接流入元 | `services/demo-service.getDemoData()` |
| 中間加工 | なし |
| 流出先 | なし |

## 実 API 化時の置換

将来は以下への置換が想定されます。

- `GET /students/profile`
- `GET /auth/me`

固定文言バッジは、将来 `membershipStatus` や `serviceStatus` に基づく動的表示へ置換可能です。
