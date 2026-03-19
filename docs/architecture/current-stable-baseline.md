# 当前稳定基线

## 仓库根目录

当前仓库已经整理成一个适合长期演进的多应用工作区：

```text
KotobaLink/
  apps/
    miniapp/
  packages/
    shared/
    types/
  docs/
  infra/
  scripts/
  tests/
  package.json
  pnpm-workspace.yaml
  project.config.json
  project.private.config.json
```

## 微信小程序入口

- 微信开发者工具应打开 `KotobaLink` 根目录
- 小程序根目录通过 `project.config.json` 配置
- `miniprogramRoot` 指向 `apps/miniapp/`

## Miniapp 内部边界

当前 `apps/miniapp/` 内部职责划分如下：

- `pages/`：按业务域组织的小程序页面入口
- `services/`：页面对外的数据访问与 selector 入口
- `store/`：小程序本地状态与持久化
- `mock/`：demo 假数据与 demo 组装逻辑
- `config/`：demo 常量与小程序本地配置
- `behaviors/`：可复用的小程序 behavior
- `templates/`：共享的 WXML 模板片段
- `utils/`：仅保留兼容层用途

## 当前页面业务分组

- `pages/tab/`：主导航页
- `pages/learning/`：课表、作业、lesson、assessment 流程
- `pages/catalog/`：课程详情与课程目录侧页面
- `pages/account/`：会员与已报名课程详情
- `pages/engagement/`：活动相关流程
- `pages/commerce/`：支付相关流程
- `pages/legacy/`：未注册的历史模板页，仅保留参考

## 当前稳定共享层

`packages/types` 当前已经承载稳定契约，覆盖：
- user
- course
- lesson
- assessment
- message
- activity
- order
- common statuses

`packages/shared` 当前已经承载可移植纯函数，覆盖：
- 日期 key 解析与格式化
- 分数转换
- 课表排序与 lesson 日期格式化
- 消息排序与筛选统计

## 当前刻意没有共享出去的内容

下面这些目前仍然有意保留在 `apps/miniapp` 内：
- `wx.getStorageSync` / `wx.setStorageSync`
- 页面跳转
- 小程序页面 view model 组装
- 无障碍行为绑定
- 强 demo 语义的展示逻辑

## 当前稳定目标

当前仓库已经进入一个适合继续推进的稳定阶段，可以支持：
- 继续迭代小程序 demo
- 开始完善项目说明文档
- 后续新增 `web`、`admin`、`backend` 时不再改动顶层结构

下一阶段重点应是文档、产品定义和真实业务设计，而不是继续做结构迁移。
