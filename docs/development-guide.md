# 开发说明

## 文档范围

本文档只说明当前仓库的开发入口、目录规则和文档维护规则。

功能细节、页面控件设计和状态联动不在本文档重复展开：

- 项目结构：见架构文档
- 数据分层：见 [数据架构](./data-architecture.md)
- 控件与页面设计：见详细设计文档

## 当前开发入口

| 项目 | 位置 |
| --- | --- |
| 仓库根目录 | `KotobaLink/` |
| 微信工程入口 | 仓库根目录 |
| 小程序源码目录 | `apps/miniapp/` |
| 小程序根配置 | `project.config.json` |
| 文档站目录 | `docs/` |

## 代码放置规则

| 内容 | 目录 |
| --- | --- |
| 小程序页面 | `apps/miniapp/pages/` |
| demo 假数据 | `apps/miniapp/mock/` |
| 本地状态与持久化 | `apps/miniapp/store/` |
| 页面对外取数逻辑 | `apps/miniapp/services/` |
| 小程序配置 | `apps/miniapp/config/` |
| 稳定数据契约 | `packages/types/` |
| 可复用纯函数 | `packages/shared/` |

## 当前约束

- 新页面注册到 `apps/miniapp/app.json`
- 不在 `apps/` 之外新增应用代码
- 不向 `apps/miniapp/utils/` 继续堆放业务逻辑
- 页面不直接读取 `mock/`
- 依赖 `wx.*` 的逻辑不进入共享包
- `pages/legacy/` 不作为正式业务目录使用

## 文档维护规则

| 变更类型 | 需要同步的文档 |
| --- | --- |
| 页面范围变更 | `docs/page-inventory.md`、详细设计页面文档 |
| 控件字段或交互变更 | 对应详细设计控件文档 |
| 状态或数据来源变更 | `docs/data-architecture.md`、对应详细设计控件文档 |
| 仓库结构变更 | `docs/architecture/current-stable-baseline.md`、`apps/miniapp/README.md` |

## 相关文档

- [页面清单](./page-inventory.md)
- [数据架构](./data-architecture.md)
- [当前稳定基线](./architecture/current-stable-baseline.md)
- `docs/ja/detailed-design/`
