# API フィールド契約

## 文書目的

この文書は、主要 API の返却オブジェクトに対する初期フィールド構造を整理するものです。

ここでは最終 OpenAPI ではなく、前後端の初期契約を扱います。

## 1. 学員プロフィール

### `GET /students/profile`

サンプル返却:

```json
{
  "id": "student_001",
  "name": "张三",
  "avatar": "https://...",
  "level": "N4",
  "currentCourse": "N4 语法强化班",
  "className": "周三晚间班",
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
    "name": "N4 语法强化班",
    "type": "长期课程",
    "duration": "8 周",
    "price": "JPY 32000",
    "benefit": "含作业点评与阶段测评",
    "summary": "面向 N4 阶段语法巩固与运用",
    "teacher": "中村老师",
    "classType": "小班课",
    "classSchedule": "每周三 19:30",
    "classroom": "线上教室 A",
    "status": "可报名"
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
    "courseName": "N4 语法强化班",
    "className": "周三晚间班",
    "teacher": "中村老师",
    "classroom": "线上教室 A",
    "serviceStatus": "已开通",
    "lessonProgress": {
      "completed": 4,
      "total": 12,
      "pendingMakeups": 1
    },
    "classInfo": "每周三 19:30 上课"
  }
]
```

## 4. フィールド契約ルール

1. 一覧と詳細ではコアフィールド名を可能な限り共通化する
2. 時間フィールドは明確な形式で統一する
3. 状態フィールドは列挙で定義する
4. 同一オブジェクトに対してインターフェースごとに別名を増やさない
5. 共有フィールド名は `packages/types` を優先して参照する
