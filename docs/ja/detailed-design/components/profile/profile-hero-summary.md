# マイページ Hero Summary

## 基本情報

| 項目 | 内容 |
| --- | --- |
| コンポーネント ID | `CMP-PROFILE-001` |
| 実装元 | `pages/tab/profile/index.wxml` / `index.js` |
| 関連イベント | `goMembership` |
| 直接依存 service | `getDemoData()` |

## 責務

このコンポーネントは、学員本人の基本識別情報と会員入口を同時に表示するマイページの先頭領域です。氏名、当前课程、班级、等级、服务有效期をまとめて表示します。

## 表示フィールド表

| 表示名 | キー | 型 |
| --- | --- | --- |
| 姓名 | `demo.student.name` | `string` |
| 当前课程 | `demo.student.course` | `string` |
| 班级 | `demo.student.className` | `string` |
| 等级 | `demo.student.level` | `string` |
| 服务有效期 | `demo.student.renewal` | `string` |

## frontend 操作項目表

| 操作対象 | イベント | 処理 | 遷移先 |
| --- | --- | --- | --- |
| `会员中心` ボタン | `goMembership` | 会員ページへ遷移 | `/pages/account/membership/index` |

## backend データ要求

主な backend エンティティ:
- `Student`
- `Membership`
- `Enrollment`

## 想定 API 一覧

| 用途 | Method | Path |
| --- | --- | --- |
| マイページ上部サマリー取得 | `GET` | `/api/v1/students/{studentId}/profile/header` |

## API フィールド対応表

| 画面フィールド | 想定 response フィールド |
| --- | --- |
| `demo.student.name` | `student.displayName` |
| `demo.student.course` | `currentEnrollment.courseName` |
| `demo.student.className` | `currentEnrollment.className` |
| `demo.student.level` | `student.levelLabel` |
| `demo.student.renewal` | `membership.validUntilLabel` |
