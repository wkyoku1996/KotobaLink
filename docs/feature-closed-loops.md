# 功能闭环路径

## 文档范围

本文档只保留当前 demo 的跨页面闭环索引，用于说明闭环起点、终点、关联状态和对应设计文档位置。

页面内控件事件、按钮动作、字段来源与写回位置不在本文档重复展开，统一以详细设计文档为准。

## 当前闭环索引

| 闭环名称 | 起点页面 | 终点页面 | 关联状态 | 关联页面 |
| --- | --- | --- | --- | --- |
| 课程购买 | `pages/tab/course/index` | `pages/commerce/payment/index` | `purchasedCourseIds`、`lastPurchasedCourseId` | `pages/catalog/course-detail/index` |
| 活动报名 | `pages/tab/home/index` / `pages/learning/schedule/index` | `pages/engagement/activity/index` | `activitySignedUp` | `pages/learning/schedule/index`、`pages/tab/messages/index` |
| 每日任务 | `pages/tab/task/index` | `pages/tab/task/index` | `learnedVocabIds`、`dailyTaskCompleted` | 无 |
| 作业提交 | `pages/tab/task/index` / `pages/learning/schedule/index` | `pages/learning/homework/index` | `homeworkSubmitted` | `pages/tab/profile/index` |
| 消息阅读 | `pages/tab/messages/index` | `pages/tab/messages/index` | `readNotificationIds` | 无 |
| 课表进入课程内容 | `pages/learning/schedule/index` | `pages/learning/lesson-detail/index` | 无独立写回状态 | 无 |
| 个人中心进入会员页 | `pages/tab/profile/index` | `pages/account/membership/index` | 无独立写回状态 | 无 |

## 阅读方式

1. 在本文档确认闭环涉及的页面与状态字段
2. 在 [页面清单](./page-inventory.md) 中确认页面路径
3. 在详细设计页面文档中确认控件构成
4. 在对应控件文档中查看具体按钮、字段、事件和状态写回位置

## 相关文档

- [当前 Demo 功能说明](./demo-features.md)
- [数据架构](./data-architecture.md)
- [从 Demo 到正式项目](./project-transition-plan.md)
- `docs/ja/detailed-design/`
