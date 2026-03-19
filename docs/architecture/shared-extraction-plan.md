# 共享层提取计划

## 目标

把仓库从“小程序本地 utility 模式”逐步推进为“可复用共享包模式”，同时不打断当前小程序运行。

## 当前问题

`apps/miniapp/utils/demo-data.js` 过去混合了多种职责：
- 基础 mock 数据
- 本地状态持久化
- 日期工具
- 纯映射函数
- 面向页面的 selector
- 领域投影逻辑

这会导致这些逻辑很难复用到：
- 小程序
- Web
- 后台
- 后端

## 目标拆分

### 迁入 `packages/types`

稳定契约包括：
- student
- teacher
- course
- enrolled course
- lesson
- assessment
- notification
- membership plan
- activity
- payment order
- demo state

### 迁入 `packages/shared`

纯逻辑包括：
- `formatDateKey`
- 周范围处理
- 课表排序
- 分数转换
- 消息排序
- 课程与 lesson 映射逻辑

### 当前继续保留在小程序内

在平台真正迁移前，下面这些先继续留在小程序代码中：
- `wx.getStorageSync`
- `wx.setStorageSync`
- 页面刷新 glue
- `Page(...)` 数据编排
- 小程序导航行为

## 推荐提取顺序

1. 先提取共享日期处理
2. 再提取分数与格式化逻辑
3. 再提取消息排序与映射逻辑
4. 再提取课程与 lesson 投影逻辑
5. 再把状态持久化下沉到 `apps/miniapp/store`
6. 最后逐步替换剩余 `apps/miniapp/utils` 对旧逻辑的依赖

## 安全迁移规则

任何函数只有在它可以不做修改地运行于以下所有环境时，才应该进入 `packages/shared`：
- backend
- web
- admin
- miniapp

如果它依赖 `wx`，就不应该进入共享层。
