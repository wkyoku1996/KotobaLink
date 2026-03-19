# Miniapp 边界说明

## 文档目的

这份文档用于说明：哪些内容保留在 `apps/miniapp` 内，哪些内容后续迁出。

## 应保留在 `apps/miniapp` 内的内容

- 所有调用 `wx.*` 的逻辑
- 页面跳转
- `Page(...)` 生命周期编排
- 无障碍 behavior 与模板绑定
- 小程序专属展示状态
- 临时 demo glue code

## 进入 `packages/shared` 的内容

满足平台无关条件时，下面这些进入 `packages/shared`：

- 纯日期处理
- 分数转换
- 消息排序
- 课表排序
- 其他不依赖平台 API 的纯业务转换逻辑

## 进入 `packages/types` 的内容

字段定义稳定后，下面这些进入 `packages/types`：

- 数据实体字段契约
- 类枚举状态定义
- API payload 定义
- 查询参数契约

## 保留在 `mock/` 的内容

- demo 假数据
- 临时 seed 数据
- 演示专用文案与组合逻辑

## 保留在 `store/` 的内容

- 本地持久化 key
- demo 状态更新逻辑
- 基于 storage 的 UI 状态

## 保留在 `services/` 的内容

- 页面对外的数据入口
- 协调 `mock/` 与 `store/`
- 未来把真实后端数据映射成小程序视图数据的适配层

## 实用判断规则

如果一个文件去掉 `wx` 之后无法成立，那么它保留在 `apps/miniapp` 内。
