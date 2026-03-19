# 后续接口需求清单

## 文档目的

这份文档用于整理：如果当前 demo 要逐步落成真实项目，后续至少需要哪些后端接口。

这里列的是按业务域整理的接口需求，不是最终协议定义。

## 1. 用户与身份

核心目标：
- 识别当前用户
- 拉取学员基础资料
- 管理登录态

建议接口：
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `GET /students/profile`
- `GET /students/growth-summary`

主要服务页面：
- 首页
- 我的
- 会员中心

## 2. 课程目录与已报名课程

核心目标：
- 展示课程列表
- 区分可购买课程与已报名课程
- 获取课程详情

建议接口：
- `GET /courses/catalog`
- `GET /courses/catalog/:courseId`
- `GET /students/courses`
- `GET /students/courses/:courseId`

主要服务页面：
- 课程页
- 课程详情页
- 已报名课程详情页

## 3. 课表与 lesson

核心目标：
- 获取当前周课表
- 查看 lesson 详情
- 让课表和课程内容对齐

建议接口：
- `GET /schedule/week`
- `GET /schedule/day`
- `GET /courses/:courseId/lessons`
- `GET /courses/:courseId/lessons/:lessonId`

主要服务页面：
- 首页课表摘要
- 课表页
- lesson 详情页

## 4. assessment 与成长记录

核心目标：
- 获取测评列表
- 获取测评详情
- 获取成长数据

建议接口：
- `GET /courses/:courseId/assessments`
- `GET /courses/:courseId/assessments/:assessmentId`
- `GET /students/growth/radar`
- `GET /students/growth/trend`
- `GET /students/growth/milestones`

主要服务页面：
- 个人中心
- 已报名课程详情
- assessment 详情页

## 5. 任务与作业

核心目标：
- 获取每日任务
- 标记学习进度
- 提交作业
- 获取作业反馈

建议接口：
- `GET /tasks/daily`
- `POST /tasks/daily/vocab/:wordId/complete`
- `POST /tasks/daily/check-in`
- `GET /homeworks/current`
- `POST /homeworks/:homeworkId/submissions`
- `GET /homeworks/:homeworkId/feedback`

主要服务页面：
- 任务页
- 作业页

## 6. 消息中心

核心目标：
- 获取消息列表
- 获取消息详情
- 标记消息已读

建议接口：
- `GET /notifications`
- `GET /notifications/:notificationId`
- `POST /notifications/:notificationId/read`
- `POST /notifications/read-all`

主要服务页面：
- 消息中心

## 7. 活动

核心目标：
- 获取活动详情
- 活动报名/取消报名
- 查询当前用户报名状态

建议接口：
- `GET /activities`
- `GET /activities/:activityId`
- `POST /activities/:activityId/signup`
- `POST /activities/:activityId/cancel`
- `GET /activities/:activityId/registration`

主要服务页面：
- 活动页
- 课表页
- 首页活动入口

## 8. 订单与支付

核心目标：
- 创建订单
- 拉起支付
- 查询支付结果

建议接口：
- `POST /orders`
- `GET /orders/:orderId`
- `POST /orders/:orderId/pay`
- `GET /payments/:paymentId/status`
- `GET /students/orders`

主要服务页面：
- 课程详情页
- 支付结果页

## 9. 会员体系

核心目标：
- 获取会员信息
- 获取套餐列表
- 购买/续费会员

建议接口：
- `GET /memberships/current`
- `GET /memberships/plans`
- `POST /memberships/orders`
- `GET /memberships/orders/:orderId`

主要服务页面：
- 我的
- 会员中心

## 10. 后台管理系统未来会依赖的接口域

后续后台大概率还需要：
- 学员管理接口
- 教师管理接口
- 课程管理接口
- 排课管理接口
- 活动管理接口
- 通知管理接口
- 订单管理接口
- 会员管理接口

## 当前接口优先级建议

如果按真实项目的 MVP 推进，建议优先做：

1. `auth`
2. `students/profile`
3. `courses/catalog`
4. `students/courses`
5. `schedule/week`
6. `lessons`
7. `notifications`
8. `activities`
9. `orders`
10. `homeworks`

## 当前说明

这份接口清单是“项目需求层接口”，不是最终接口协议。

后续如果开始真正开发后端，建议下一步再补两份文档：
- 数据实体设计
- API 字段级契约说明
