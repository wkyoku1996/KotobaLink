# 接口字段契约说明

## 文档目的

这份文档用于把“后续接口需求清单”再往前推进一层，先定义主要接口返回对象的大致字段结构。

这里不是最终 OpenAPI 文档，但已经可以作为后端和前端对齐的第一版契约参考。

## 一、学员资料接口

### `GET /students/profile`

建议返回：

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

## 二、课程目录接口

### `GET /courses/catalog`

建议返回：

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

## 三、已报名课程接口

### `GET /students/courses`

建议返回：

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

## 四、课表接口

### `GET /schedule/week`

建议返回：

```json
{
  "rangeStart": "2026-03-16",
  "rangeEnd": "2026-03-22",
  "items": [
    {
      "id": "lesson_1001",
      "courseId": 101,
      "dateKey": "2026-03-18",
      "startTime": "19:30",
      "endTime": "21:00",
      "title": "第 4 课：条件表达",
      "courseName": "N4 语法强化班",
      "className": "周三晚间班",
      "teacher": "中村老师",
      "status": "待上课",
      "isActivity": false
    }
  ]
}
```

## 五、Lesson 详情接口

### `GET /courses/:courseId/lessons/:lessonId`

建议返回：

```json
{
  "id": "lesson_1001",
  "courseId": 101,
  "title": "第 4 课：条件表达",
  "courseName": "N4 语法强化班",
  "className": "周三晚间班",
  "teacher": "中村老师",
  "classroom": "线上教室 A",
  "date": "2026-03-18 19:30",
  "endTime": "21:00",
  "status": "待上课",
  "outline": ["语法导入", "例句讲解", "课堂练习"],
  "vocab": ["単語A", "単語B"],
  "grammar": ["ば", "たら"],
  "practice": {
    "quizTitle": "课堂练习",
    "questions": []
  }
}
```

## 六、Assessment 详情接口

### `GET /courses/:courseId/assessments/:assessmentId`

建议返回：

```json
{
  "id": "assessment_01",
  "courseId": 101,
  "title": "阶段测评一",
  "type": "阶段测评",
  "date": "2026-03-20",
  "score": "A-",
  "summary": "语法掌握较稳定，听力仍需加强",
  "feedback": "建议加强口语与听力组合训练",
  "courseName": "N4 语法强化班",
  "className": "周三晚间班",
  "teacher": "中村老师"
}
```

## 七、消息列表接口

### `GET /notifications`

建议返回：

```json
[
  {
    "id": 1,
    "title": "本周五将进行阶段口语小考",
    "type": "任务提醒",
    "category": "task",
    "time": "2026-03-17 09:20",
    "sender": "学习系统",
    "summary": "建议提前复习本周会话表达和听频练习。",
    "tags": ["任务", "考试"],
    "important": true,
    "read": false
  }
]
```

## 八、活动详情接口

### `GET /activities/:activityId`

建议返回：

```json
{
  "id": "activity_01",
  "title": "春季日语交流沙龙",
  "summary": "面向在读学员的日语交流活动",
  "date": "2026-03-20 14:00",
  "location": "东京池袋交流空间",
  "status": "可报名",
  "capacity": 30,
  "signedUpCount": 18
}
```

## 九、订单接口

### `POST /orders`

建议请求：

```json
{
  "businessType": "course",
  "targetId": 101
}
```

建议响应：

```json
{
  "id": "order_1001",
  "businessType": "course",
  "targetId": 101,
  "price": "JPY 32000",
  "status": "pending",
  "paymentStatus": "unpaid",
  "createdAt": "2026-03-19T12:00:00+09:00"
}
```

## 十、会员接口

### `GET /memberships/current`

建议返回：

```json
{
  "id": "membership_01",
  "studentId": "student_001",
  "planName": "年度会员",
  "status": "active",
  "expireAt": "2026-06-30",
  "benefits": [
    "课程折扣",
    "活动优先报名",
    "学习资料扩展包"
  ]
}
```

## 十一、字段契约原则

后续正式定义接口时，建议统一遵守：

1. 列表与详情字段尽量共享核心字段名
2. 时间字段统一使用明确格式
3. 状态字段优先枚举化
4. 同一业务对象不要在不同接口里随意换字段名
5. 前后端共享字段名优先复用 `packages/types`

## 十二、下一步建议

这份文档之后，下一步最合理的是继续补：

1. 错误码规范
2. 登录与权限设计
3. 后台接口域设计
4. OpenAPI / Swagger 版本定义
