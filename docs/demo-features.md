# 当前 Demo 功能说明

## 文档范围

本文档只保留当前 demo 已覆盖的功能模块清单，用于说明“当前有哪些功能范围”。

模块内控件、字段、按钮、状态与数据链路不在本文档重复展开：

- 页面与控件结构：见详细设计文档
- 状态与数据分层：见 [数据架构](./data-architecture.md)
- 后续真实化改造：见 [从 Demo 到正式项目](./project-transition-plan.md)

## 当前功能模块

| 模块 | 对应页面 | 当前范围 |
| --- | --- | --- |
| 首页总览 | `pages/tab/home/index` | 学员信息、课程摘要、成长图表、快捷入口 |
| 课程 | `pages/tab/course/index`、`pages/catalog/course-detail/index`、`pages/account/profile-course-detail/index` | 课程列表、课程详情、已报名课程详情 |
| 课表 | `pages/learning/schedule/index` | 周课表、课程安排、活动安排 |
| 任务与作业 | `pages/tab/task/index`、`pages/learning/homework/index` | 词汇学习、打卡状态、作业提交 |
| 消息 | `pages/tab/messages/index` | 分类筛选、消息阅读、已读状态 |
| 个人中心 | `pages/tab/profile/index`、`pages/account/membership/index` | 学习档案、成长展示、会员入口 |
| 活动 | `pages/engagement/activity/index` | 活动详情、报名状态、状态切换 |
| 支付结果 | `pages/commerce/payment/index` | 最近订单结果、后续跳转 |
| Lesson / Assessment 详情 | `pages/learning/lesson-detail/index`、`pages/learning/assessment-detail/index` | 课程内容、题目内容、资料展示 |

## 当前状态驱动项

当前 demo 的页面联动主要依赖以下本地状态：

| 状态字段 | 作用 |
| --- | --- |
| `purchasedCourseIds` | 标记已购买课程 |
| `lastPurchasedCourseId` | 标记最近一次购买课程 |
| `homeworkSubmitted` | 标记作业是否已提交 |
| `dailyTaskCompleted` | 标记每日任务是否完成 |
| `learnedVocabIds` | 标记已学习词汇 |
| `readNotificationIds` | 标记已读消息 |
| `activitySignedUp` | 标记活动报名状态 |

这些状态的读写规则与来源位置见 [数据架构](./data-architecture.md)。

## 相关文档

- [页面清单](./page-inventory.md)
- [功能闭环路径](./feature-closed-loops.md)
- [数据架构](./data-architecture.md)
- `docs/ja/detailed-design/`
