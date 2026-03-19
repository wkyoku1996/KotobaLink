# 页面清单

## 当前已注册页面

当前小程序在 `apps/miniapp/app.json` 中注册的页面如下。

### Tab 页

- `pages/tab/home/index`：首页总览与快捷入口
- `pages/tab/course/index`：我的课程与可购买课程
- `pages/tab/task/index`：学习任务总览
- `pages/tab/messages/index`：消息中心
- `pages/tab/profile/index`：个人中心、学习档案、成长概览

### 学习流程页

- `pages/learning/schedule/index`：课表与课程时间线
- `pages/learning/homework/index`：作业提交流程
- `pages/learning/lesson-detail/index`：课程详情页
- `pages/learning/assessment-detail/index`：测评详情页

### 课程与账号页

- `pages/catalog/course-detail/index`：课程详情页（目录侧）
- `pages/account/membership/index`：会员中心
- `pages/account/profile-course-detail/index`：已报名课程详情

### 活动与交易页

- `pages/engagement/activity/index`：活动详情与报名流程
- `pages/commerce/payment/index`：支付结果页与后续入口

## 页面分组

当前页面目录按业务域分组：

- `pages/tab/`：主导航页面
- `pages/learning/`：学习过程页面
- `pages/catalog/`：课程发现与课程详情
- `pages/account/`：账号相关页面
- `pages/engagement/`：活动相关页面
- `pages/commerce/`：支付与交易页面
- `pages/legacy/`：历史模板页，不参与当前正式流程

## 当前主要演示路径

当前 demo 主要支持这些核心流转：

1. 首页 -> 课表 / 活动 / 任务
2. 课程 -> 课程详情 -> 支付结果
3. 课程 -> 已报名课程详情 -> lesson 详情 / assessment 详情
4. 任务 -> 作业页
5. 消息 -> 消息详情交互
6. 我的 -> 会员中心

## Legacy 页面

下面这些页面目前只是历史模板：
- `pages/legacy/index/*`
- `pages/legacy/logs/*`

它们没有注册到 `app.json`，当前不属于正式产品页范围。
