# 控件一覧

## 共有控件

| 控件 ID | 控件名 | 種別 | 現在の実装元 | 主な利用ページ |
| --- | --- | --- | --- | --- |
| `CMP-SHARED-001` | Hero Card | 共有レイアウト控件 | `apps/miniapp/app.wxss` | 首页、课程、消息、我的、活动、课表、详情页 |
| `CMP-SHARED-002` | Section Card | 共有セクション容器 | `apps/miniapp/app.wxss` | 全主要ページ |
| `CMP-SHARED-003` | Accessibility Controls | 共有操作控件 | `templates/accessibility.wxml` | 全主要ページ |

## 首页控件

| 控件 ID | 控件名 | 種別 | 実装元 |
| --- | --- | --- | --- |
| `CMP-HOME-001` | 首页 Hero Summary | ページ専用控件 | `pages/tab/home/index.wxml` |
| `CMP-HOME-002` | 首页 Skill Radar | ページ専用控件 | `pages/tab/home/index.wxml` + `index.js` |
| `CMP-HOME-003` | 首页 Upcoming Schedule | ページ専用控件 | `pages/tab/home/index.wxml` + `index.js` |
| `CMP-HOME-004` | 首页 Activity Entry | ページ専用控件 | `pages/tab/home/index.wxml` |
| `CMP-HOME-005` | 首页 Daily Task | ページ専用控件 | `pages/tab/home/index.wxml` |

## 课程页控件

| 控件 ID | 控件名 | 種別 | 実装元 |
| --- | --- | --- | --- |
| `CMP-COURSE-001` | 课程 Hero Summary | ページ専用控件 | `pages/tab/course/index.wxml` |
| `CMP-COURSE-002` | 课程 我的课程列表 | ページ専用控件 | `pages/tab/course/index.wxml` |
| `CMP-COURSE-003` | 课程 可购买课程列表 | ページ専用控件 | `pages/tab/course/index.wxml` |

## 任务页控件

| 控件 ID | 控件名 | 種別 | 実装元 |
| --- | --- | --- | --- |
| `CMP-TASK-001` | 任务 Hero Summary | ページ専用控件 | `pages/tab/task/index.wxml` |
| `CMP-TASK-002` | 任务 词汇列表 | ページ専用控件 | `pages/tab/task/index.wxml` |
| `CMP-TASK-003` | 任务 打卡状态 | ページ専用控件 | `pages/tab/task/index.wxml` |
| `CMP-TASK-004` | 任务 词汇弹层 | ページ専用控件 | `pages/tab/task/index.wxml` |

## 消息页控件

| 控件 ID | 控件名 | 種別 | 実装元 |
| --- | --- | --- | --- |
| `CMP-MSG-001` | 消息 Hero Summary | ページ専用控件 | `pages/tab/messages/index.wxml` |
| `CMP-MSG-002` | 消息 分类筛选 | ページ専用控件 | `pages/tab/messages/index.wxml` |
| `CMP-MSG-003` | 消息 列表 | ページ専用控件 | `pages/tab/messages/index.wxml` |
| `CMP-MSG-004` | 消息 详情弹层 | ページ専用控件 | `pages/tab/messages/index.wxml` |

## 我的页控件

| 控件 ID | 控件名 | 種別 | 実装元 |
| --- | --- | --- | --- |
| `CMP-PROFILE-001` | 我的 Hero Summary | ページ専用控件 | `pages/tab/profile/index.wxml` |
| `CMP-PROFILE-002` | 我的 学习档案 | ページ専用控件 | `pages/tab/profile/index.wxml` |
| `CMP-PROFILE-003` | 我的 成长概要 | ページ専用控件 | `pages/tab/profile/index.wxml` |
| `CMP-PROFILE-004` | 我的 成绩趋势 | ページ専用控件 | `pages/tab/profile/index.wxml` + `index.js` |
| `CMP-PROFILE-005` | 我的 能力画像 | ページ専用控件 | `pages/tab/profile/index.wxml` + `index.js` |
| `CMP-PROFILE-006` | 我的 测评列表 | ページ専用控件 | `pages/tab/profile/index.wxml` |
| `CMP-PROFILE-007` | 我的 里程碑 | ページ専用控件 | `pages/tab/profile/index.wxml` |
| `CMP-PROFILE-008` | 我的 教师总结 | ページ専用控件 | `pages/tab/profile/index.wxml` |

## 流程页控件

| 控件 ID | 控件名 | 種別 | 実装元 |
| --- | --- | --- | --- |
| `CMP-SCHEDULE-001` | 课表 Hero Summary | ページ専用控件 | `pages/learning/schedule/index.wxml` |
| `CMP-SCHEDULE-002` | 课表 周课表面板 | ページ専用控件 | `pages/learning/schedule/index.wxml` |
| `CMP-HOMEWORK-001` | 作业 作业内容卡 | ページ専用控件 | `pages/learning/homework/index.wxml` |
| `CMP-HOMEWORK-002` | 作业 提交结果区 | ページ専用控件 | `pages/learning/homework/index.wxml` |
| `CMP-ACTIVITY-001` | 活动 Hero Summary | ページ専用控件 | `pages/engagement/activity/index.wxml` |
| `CMP-ACTIVITY-002` | 活动 信息与报名卡 | ページ専用控件 | `pages/engagement/activity/index.wxml` |
| `CMP-PAYMENT-001` | 支付 Hero Summary | ページ専用控件 | `pages/commerce/payment/index.wxml` |
| `CMP-PAYMENT-002` | 支付 订单信息卡 | ページ専用控件 | `pages/commerce/payment/index.wxml` |
| `CMP-CATALOG-001` | 课程详情 Hero Summary | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-CATALOG-002` | 课程详情 当前课次卡 | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-CATALOG-003` | 课程详情 课程基本信息 | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-CATALOG-004` | 课程详情 班级基本信息 | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-CATALOG-005` | 课程详情 教师基本信息 | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-CATALOG-006` | 课程详情 Lesson 列表 | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-CATALOG-007` | 课程详情 考核概览 | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-CATALOG-008` | 课程详情 购买操作区 | ページ専用控件 | `pages/catalog/course-detail/index.wxml` |
| `CMP-ENROLLED-001` | 已报名课程 Hero Summary | ページ専用控件 | `pages/account/profile-course-detail/index.wxml` |
| `CMP-ENROLLED-002` | 已报名课程 课程基本信息 | ページ専用控件 | `pages/account/profile-course-detail/index.wxml` |
| `CMP-ENROLLED-003` | 已报名课程 班级基本信息 | ページ専用控件 | `pages/account/profile-course-detail/index.wxml` |
| `CMP-ENROLLED-004` | 已报名课程 教师基本信息 | ページ専用控件 | `pages/account/profile-course-detail/index.wxml` |
| `CMP-ENROLLED-005` | 已报名课程 Lesson 列表 | ページ専用控件 | `pages/account/profile-course-detail/index.wxml` |
| `CMP-ENROLLED-006` | 已报名课程 测试列表 | ページ専用控件 | `pages/account/profile-course-detail/index.wxml` |
| `CMP-LESSON-001` | Lesson Hero Summary | ページ専用控件 | `pages/learning/lesson-detail/index.wxml` |
| `CMP-LESSON-002` | Lesson 基本信息 | ページ専用控件 | `pages/learning/lesson-detail/index.wxml` |
| `CMP-LESSON-003` | Lesson 大纲列表 | ページ専用控件 | `pages/learning/lesson-detail/index.wxml` |
| `CMP-LESSON-004` | Lesson 重点词汇 | ページ専用控件 | `pages/learning/lesson-detail/index.wxml` |
| `CMP-LESSON-005` | Lesson 重点语法 | ページ専用控件 | `pages/learning/lesson-detail/index.wxml` |
| `CMP-LESSON-006` | Lesson 课后练习 | ページ専用控件 | `pages/learning/lesson-detail/index.wxml` |
| `CMP-ASSESS-001` | Assessment Hero Summary | ページ専用控件 | `pages/learning/assessment-detail/index.wxml` |
| `CMP-ASSESS-002` | Assessment 考试信息 | ページ専用控件 | `pages/learning/assessment-detail/index.wxml` |
| `CMP-ASSESS-003` | Assessment 题目列表 | ページ専用控件 | `pages/learning/assessment-detail/index.wxml` |
| `CMP-MEMBER-001` | 会员 Hero Summary | ページ専用控件 | `pages/account/membership/index.wxml` |
| `CMP-MEMBER-002` | 会员 当前权益 | ページ専用控件 | `pages/account/membership/index.wxml` |
| `CMP-MEMBER-003` | 会员 升级方案列表 | ページ専用控件 | `pages/account/membership/index.wxml` |
