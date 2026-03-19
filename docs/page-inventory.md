# 页面清单

## 文档范围

本文档只说明当前 miniapp 已注册页面、页面分组和页面与详细设计文档之间的对应关系。

页面内部控件、字段、按钮、状态联动与数据去向不在本文档展开，相关内容统一放在详细设计文档中维护。

## 当前已注册页面

| 页面路径 | 页面名称 | 页面分组 | 主要作用 |
| --- | --- | --- | --- |
| `pages/tab/home/index` | 首页 | Tab | 学习总览、快捷入口 |
| `pages/tab/course/index` | 课程 | Tab | 课程列表、购课入口 |
| `pages/tab/task/index` | 任务 | Tab | 每日任务、词汇学习 |
| `pages/tab/messages/index` | 消息 | Tab | 消息筛选、消息阅读 |
| `pages/tab/profile/index` | 我的 | Tab | 学习档案、成长展示 |
| `pages/learning/schedule/index` | 课表 | 学习流程 | 周课表、课程安排 |
| `pages/learning/homework/index` | 作业 | 学习流程 | 作业查看、作业提交 |
| `pages/learning/lesson-detail/index` | Lesson 详情 | 学习流程 | 课程内容展示 |
| `pages/learning/assessment-detail/index` | Assessment 详情 | 学习流程 | 考试信息与题目展示 |
| `pages/catalog/course-detail/index` | 课程详情 | 课程 | 课程介绍、购买入口 |
| `pages/account/membership/index` | 会员中心 | 账号 | 会员权益与方案展示 |
| `pages/account/profile-course-detail/index` | 已报名课程详情 | 账号 | 已报名课程信息、Lesson/Assessment 入口 |
| `pages/engagement/activity/index` | 活动 | 活动 | 活动详情、报名状态 |
| `pages/commerce/payment/index` | 支付结果 | 交易 | 订单结果、后续入口 |

## 页面目录分组

| 目录 | 含义 |
| --- | --- |
| `pages/tab/` | 主导航页面 |
| `pages/learning/` | 学习过程页面 |
| `pages/catalog/` | 课程目录与购买页面 |
| `pages/account/` | 账号与已报名课程页面 |
| `pages/engagement/` | 活动相关页面 |
| `pages/commerce/` | 支付与交易页面 |
| `pages/legacy/` | 历史模板页，不在当前正式流程中使用 |

## 与详细设计文档的关系

当前控件级详细设计优先维护在日文详细设计目录中：

- `docs/ja/detailed-design/pages/`
- `docs/ja/detailed-design/components/`

推荐使用顺序：

1. 在本文档确认页面路径与页面分组
2. 在 `docs/ja/detailed-design/pages/` 查看页面的控件构成
3. 在对应控件文档中查看字段、事件、状态、数据来源与连锁去向

## 非正式页面

以下页面不在当前注册范围内：

- `pages/legacy/index/*`
- `pages/legacy/logs/*`

这些页面不参与当前产品流程，也不纳入详细设计维护范围。
