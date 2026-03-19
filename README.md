# KotobaLink

KotobaLink 当前是一个以微信小程序为核心的学习服务 demo 项目，同时已经完成了多应用工作区结构整理，便于后续继续扩展为：

- Web 前台
- 管理后台
- 后端服务

## 当前状态

目前仓库中真正可运行的应用是小程序：

- 小程序目录：`apps/miniapp`
- 微信开发者工具打开目录：仓库根目录 `KotobaLink`
- 小程序读取路径：`project.config.json` 中的 `miniprogramRoot: apps/miniapp/`

当前 demo 已经覆盖的核心功能包括：

- 首页总览
- 课程与课程详情
- 课程购买与支付结果
- 任务与作业
- 消息中心
- 个人中心与成长展示
- 课表
- 活动报名
- lesson / assessment 详情

## 仓库结构

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
```

当前结构的目标是：

- 保持小程序可以继续快速开发
- 降低 demo 数据、页面、状态之间的耦合
- 为未来真实项目开发保留稳定结构
- 让文档、交接和后续扩展更顺畅

## 文档入口

建议从这里开始看项目说明：

- [文档索引](./docs/README.md)
- [项目概览](./docs/project-overview.md)
- [页面清单](./docs/page-inventory.md)
- [数据架构](./docs/data-architecture.md)
- [当前 Demo 功能说明](./docs/demo-features.md)
- [功能闭环路径](./docs/feature-closed-loops.md)
- [从 Demo 到正式项目的改造工作](./docs/project-transition-plan.md)
- [后续接口需求清单](./docs/api-requirements.md)

如果本地已经安装依赖，也可以直接启动文档站：

```bash
pnpm docs:dev
```

如果仓库已开启 GitHub Pages，文档也可以通过在线站点查看。

## 当前技术方向

- `apps/miniapp`：小程序专属代码
- `packages/types`：稳定数据契约
- `packages/shared`：可复用纯函数
- `docs`：项目说明与架构文档

## 后续方向

下一阶段重点不是继续改目录，而是：

1. 完善项目文档与产品说明
2. 明确正式项目的数据实体和接口设计
3. 逐步把 demo 驱动替换成真实业务驱动
4. 启动后台与后端建设
