# 开发说明

## 当前开发入口

如果当前要开发小程序：

1. 在微信开发者工具中打开仓库根目录 `KotobaLink`
2. 小程序源码通过 `project.config.json` 读取
3. `miniprogramRoot` 指向 `apps/miniapp/`

## 当前开发规则

### 新增小程序页面

- 页面放到 `apps/miniapp/pages/` 对应业务目录下
- 需要启用的页面注册到 `apps/miniapp/app.json`
- 不要把新页面直接放到仓库根目录

### 新增数据逻辑

- demo 假数据放 `apps/miniapp/mock/`
- storage 与本地状态放 `apps/miniapp/store/`
- 页面对外取数逻辑放 `apps/miniapp/services/`
- 小程序本地配置放 `apps/miniapp/config/`

### 新增共享逻辑

- 稳定数据契约放 `packages/types/`
- 可复用纯函数放 `packages/shared/`
- 任何依赖 `wx.*` 的逻辑都不要放进共享包

### 应避免的做法

- 不要再往 `apps/miniapp/utils/` 塞新业务逻辑
- 不要让页面直接读取 `mock/`
- 不要在 `apps/` 之外新增应用代码
- 不要把 `pages/legacy/` 当成当前正式产品代码

## 当前推荐扩展顺序

目前最安全的推进顺序是：

1. 继续在 `apps/miniapp` 中开发小程序功能
2. 补齐产品与流程文档
3. 在 `packages/types` 中沉淀后端与多端共用契约
4. 在 `packages/shared` 中继续提取稳定纯函数
5. 未来把 Web、后台、后端直接放到 `apps/` 下启动

## 文档维护规则

如果产品范围有变化，至少更新：
- `docs/project-overview.md`
- `docs/page-inventory.md`
- `docs/data-architecture.md`

如果仓库结构有变化，至少更新：
- `docs/architecture/current-stable-baseline.md`
- `apps/miniapp/README.md`
