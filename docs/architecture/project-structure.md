# 项目结构蓝图

## 目标

构建一套能够支撑长期并行开发的仓库结构，用于覆盖：
- 微信小程序
- Web 前台
- 管理后台前端
- 后端服务
- 共享业务模型、接口契约与工程工具

这套结构需要满足：
- 足够稳定，能够长期演进
- 足够灵活，支持分阶段迁移
- 足够清晰，支持多人协作且不继续制造耦合

## 目标顶层结构

```text
root/
  apps/
    miniapp/
    web/
    admin/
    backend/
  packages/
    shared/
    types/
    api-client/
    ui/
    config/
  docs/
    architecture/
    product/
    api/
    ops/
  infra/
  scripts/
  tests/
  legacy/
```

## 目录职责

### `apps/`

`apps/` 用来放可独立构建、独立部署的应用入口。

#### `apps/miniapp`

- 微信小程序源码
- 小程序专属配置
- 小程序专属页面与组件
- 把共享业务数据映射成小程序视图数据的适配层

当前仓库现状：
- 小程序已经迁移到 `apps/miniapp`
- 微信开发者工具应打开 `KotobaLink`
- `project.config.json` 已配置 `miniprogramRoot: "apps/miniapp/"`

目标内部结构：

```text
apps/miniapp/
  app.js
  app.json
  app.wxss
  pages/
  templates/
  utils/
  sitemap.json
```

#### `apps/web`

- 面向用户的 Web 前台
- 课程、课表、消息、会员等消费者侧流程

目标内部结构：

```text
apps/web/
  src/
    app/
    pages/
    components/
    features/
    services/
    store/
    styles/
```

#### `apps/admin`

- 管理后台
- 面向运营和管理的课程、订单、学员、教师、活动、消息等模块

目标内部结构：

```text
apps/admin/
  src/
    app/
    pages/
    components/
    features/
    services/
    store/
    permissions/
```

#### `apps/backend`

- 后端服务入口
- REST / RPC API
- 认证授权、领域服务、持久化、任务与外部集成

目标内部结构：

```text
apps/backend/
  src/
    modules/
      user/
      course/
      lesson/
      assessment/
      message/
      membership/
      activity/
      order/
    common/
    config/
    jobs/
    database/
    tests/
```

### `packages/`

`packages/` 用来放跨应用复用的共享代码，是保持结构高适配性的核心层。

#### `packages/types`

- 共享数据类型
- DTO
- API 请求与响应契约
- 事件 payload

#### `packages/shared`

- 纯共享业务工具函数
- 日期处理
- 状态映射
- 常量
- 校验工具

规则：
- 不依赖平台 API
- 不依赖 UI 框架
- 保持对 backend、web、miniapp 都可移植

#### `packages/api-client`

- 共享接口请求封装
- 类型化端点定义
- query key 规范
- 必要时的 mock adapter

#### `packages/ui`

- Web / Admin 可复用的 UI 设计令牌
- 共享组件

注意：
- 不要强行把小程序 UI 放进这个包
- 小程序更常见的共享内容是设计令牌和交互规范，而不是直接共享实现组件

#### `packages/config`

- 共享 lint 规则
- tsconfig preset
- prettier 配置
- stylelint 配置
- commitlint / release 规则

### `docs/`

`docs/` 用来承载结构化项目文档，而不是零散笔记。

#### `docs/architecture`

- Monorepo 决策
- 模块边界
- 数据流
- 集成规则
- 迁移计划

#### `docs/product`

- 业务流程图
- 页面清单
- 角色与权限
- 核心使用场景

#### `docs/api`

- API 契约
- 认证规则
- 错误码规范
- 版本说明

#### `docs/ops`

- 部署说明
- 环境配置
- 发布流程
- 回滚与故障处理

### `infra/`

用于放运维与基础设施相关资产。

示例：
- Docker
- Nginx
- CI/CD 配置
- SQL migration / seed
- 容器部署模板

### `scripts/`

用于放仓库级自动化脚本。

示例：
- bootstrap 脚本
- 代码生成
- API schema 生成类型
- mock 数据同步
- 发布辅助脚本

### `tests/`

用于放跨应用或集成测试资产。

示例：
- E2E 场景
- 集成测试 fixture
- 共享 mock payload

### `legacy/`

用于过渡期临时存放遗留内容。

仅在迁移过程中确实需要时使用。它的作用是避免在结构调整时直接打断当前工作。

## 结构设计原则

### 1. 应用层按产品面组织

使用 `apps/*` 表示可部署产品：
- 小程序
- 用户 Web
- 管理后台
- 后端

这样可以把 ownership、构建流程和部署边界表达得更明确。

### 2. 共享层与后端按业务域组织

这个项目的核心业务域包括：
- user
- course
- lesson
- assessment
- message
- membership
- activity
- order

这些域在后端模块、共享类型、接口命名和后台模块中保持一致。

### 3. 平台代码和领域代码要分开

例如：
- `wx.navigateTo` 属于小程序代码
- HTTP controller 属于后端
- 如果多个端都需要课程状态映射逻辑，这部分逻辑进入共享包

这层分离，决定了后面新增客户端时结构还能不能继续适应。

### 4. 优先分阶段迁移，而不是一次性大迁移

目前第一轮物理迁移已经完成，也就是把小程序放入了 `apps/miniapp`。

迁移顺序：
1. 先冻结顶层目标结构
2. 引入 `apps/`、`packages/`、`docs/`
3. 把共享类型和纯工具从旧 `utils/` 中提出来
4. 把小程序正式迁移到 `apps/miniapp`
5. 后续的 web、admin、backend 直接在同一套共享层上启动

## 当前仓库约束

小程序已经迁移完成。

当前约束：
1. 保持 `KotobaLink/project.config.json` 稳定
2. 继续把可复用逻辑抽到 `packages/`
3. 后续新增 web、admin、backend 时直接放到 `apps/*`
4. 不要再在仓库根目录新增小程序业务代码

## 优先建设的共享包

优先范围：
- `packages/types`：course、lesson、assessment、message、membership、activity、order
- `packages/shared`：日期工具、格式化工具、状态枚举、映射函数
- `packages/api-client`：web、admin、miniapp 共用的接口调用层

## 治理规则

为了让结构长期保持适配性：
- 新的跨应用业务逻辑不要直接写进 `apps/*`
- 新的共享代码必须先做到平台无关，才能进入 `packages/shared`
- 后端契约要同步反映在 `packages/types`
- Admin / Web 应复用领域模型，不要各自再定义一套 ad hoc 类型
- 小程序专属 UI 逻辑必须留在 `apps/miniapp`

## 不放在根目录的内容

不要把新的业务代码直接放进仓库根目录。

根目录保留：
- workspace 配置
- 仓库级文档
- 全局脚本
- 顶层治理文件

其他业务内容放入 `apps/`、`packages/`、`docs/`、`infra/`、`scripts/` 或 `tests/`。

## 当前兼容性说明

目前小程序仍然依赖 `apps/miniapp` 内部的一些相对路径，例如：
- `app.js`
- `app.json`
- `app.wxss`
- `pages/`
- `utils/`
- `templates/`

在共享逻辑继续抽到 `packages/` 之前，这些路径保持稳定。
