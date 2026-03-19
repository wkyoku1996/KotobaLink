# API Field Contracts

## Document Purpose

This document pushes the API requirements list one level deeper by defining the initial field structure of major API payloads.

It is not the final OpenAPI specification, but it can be used as the first shared contract between frontend and backend.

## 1. Student Profile

### `GET /students/profile`

Sample response:

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

## 2. Course Catalog

### `GET /courses/catalog`

Sample response:

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

## 3. Enrolled Courses

### `GET /students/courses`

Sample response:

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

## 4. Contract Rules

1. list and detail payloads should share core field names whenever possible
2. time fields should use explicit formats
3. status fields should be enumerated
4. the same business object should not use arbitrary field renaming across endpoints
5. shared field names should align with `packages/types`
