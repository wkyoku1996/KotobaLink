# API フィールド契約

## 文書目的

この文書は、主要 API の返却オブジェクトに対する初期フィールド構造を整理するものです。

ここでは最終 OpenAPI ではなく、前後端の初期契約を扱います。

## 1. 受講生プロフィール

### `GET /students/profile`

サンプル返却:

```json
{
  "id": "student_001",
  "name": "佐藤花子",
  "avatar": "https://...",
  "level": "N4",
  "currentCourse": "N4 文法強化コース",
  "className": "水曜夜クラス",
  "membershipStatus": "active",
  "membershipExpireAt": "2026-06-30"
}
```

## 2. コースカタログ

### `GET /courses/catalog`

サンプル返却:

```json
[
  {
    "id": 101,
    "name": "N4 文法強化コース",
    "type": "継続コース",
    "duration": "8 周",
    "price": "JPY 32000",
    "benefit": "宿題フィードバックと段階評価を含む",
    "summary": "N4 段階の文法定着と運用を対象とする",
    "teacher": "中村先生",
    "classType": "少人数クラス",
    "classSchedule": "毎週水曜 19:30",
    "classroom": "オンライン教室 A",
    "status": "申込可能"
  }
]
```

## 3. 受講中コース

### `GET /students/courses`

サンプル返却:

```json
[
  {
    "id": 101,
    "courseId": 101,
    "courseName": "N4 文法強化コース",
    "className": "水曜夜クラス",
    "teacher": "中村先生",
    "classroom": "オンライン教室 A",
    "serviceStatus": "提供中",
    "lessonProgress": {
      "completed": 4,
      "total": 12,
      "pendingMakeups": 1
    },
    "classInfo": "毎週水曜 19:30 開講"
  }
]
```

## 4. フィールド契約ルール

1. 一覧と詳細ではコアフィールド名を可能な限り共通化する
2. 時間フィールドは明確な形式で統一する
3. 状態フィールドは列挙で定義する
4. 同一オブジェクトに対してインターフェースごとに別名を増やさない
5. 共有フィールド名は `packages/types` を優先して参照する
