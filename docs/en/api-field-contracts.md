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
  "name": "Hana Sato",
  "avatar": "https://...",
  "level": "N4",
  "currentCourse": "N4 Grammar Intensive",
  "className": "Wednesday Evening Class",
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
    "name": "N4 Grammar Intensive",
    "type": "long-term course",
    "duration": "8 周",
    "price": "JPY 32000",
    "benefit": "includes homework feedback and stage assessments",
    "summary": "focused on strengthening and applying N4 grammar",
    "teacher": "Ms. Nakamura",
    "classType": "small-group class",
    "classSchedule": "Every Wednesday 19:30",
    "classroom": "Online Classroom A",
    "status": "open for enrollment"
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
    "courseName": "N4 Grammar Intensive",
    "className": "Wednesday Evening Class",
    "teacher": "Ms. Nakamura",
    "classroom": "Online Classroom A",
    "serviceStatus": "active",
    "lessonProgress": {
      "completed": 4,
      "total": 12,
      "pendingMakeups": 1
    },
    "classInfo": "Class meets every Wednesday at 19:30"
  }
]
```

## 4. Contract Rules

1. list and detail payloads should share core field names whenever possible
2. time fields should use explicit formats
3. status fields should be enumerated
4. the same business object should not use arbitrary field renaming across endpoints
5. shared field names should align with `packages/types`
