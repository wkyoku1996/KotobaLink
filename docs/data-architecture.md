# 数据架构

## 当前原则

当前项目的做法是：把小程序内部数据职责分开，同时为后续多端开发预留稳定共享层。

## 当前分层

### `apps/miniapp/mock`

用途：
- demo 假数据
- 演示用种子数据
- demo 组装输入

当前说明：
- 这一层用于承载 demo 数据语义
- 这一层不负责小程序本地存储行为

### `apps/miniapp/store`

用途：
- 本地持久化
- 基于 storage 的状态
- 小程序本地状态变更逻辑

示例：
- demo 状态持久化
- 无障碍设置状态

### `apps/miniapp/services`

用途：
- 页面对外的数据入口
- 协调 `mock/` 与 `store/`
- 提供页面使用的 selector 和查询接口

当前规则：
- 页面应优先调用 `services/*`
- 页面不要直接读取 `mock/`

### `apps/miniapp/config`

用途：
- 小程序本地常量
- demo 默认配置
- storage key
- 演示日期锚点等配置

### `packages/types`

用途：
- 稳定的数据契约
- 共享字段约定
- 类枚举状态定义

当前覆盖：
- user
- course
- lesson
- assessment
- message
- activity
- order
- common statuses

### `packages/shared`

用途：
- 可跨端复用的纯函数
- 不依赖 `wx.*`
- 不读写 storage
- 不承载 UI 行为

当前覆盖：
- 日期 key 处理
- 分数转换
- lesson 日期格式化
- 课表排序
- 消息排序与筛选统计

## 当前还没有共享出去的内容

下面这些目前仍然有意保留在小程序内部：
- 页面 view model
- 页面跳转行为
- 基于 storage 的 glue logic
- 强 demo 语义的展示逻辑
- 无障碍行为绑定

## 当前使用规则

字段放置规则：
- 依赖 `wx.*`，就留在 `apps/miniapp`
- 是稳定的数据结构约定，就进 `packages/types`
- 是纯函数且后续可复用，就进 `packages/shared`
- 是 demo 数据内容，就留在 `mock/`
