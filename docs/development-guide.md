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
| 管理后台目录 | `apps/admin/` |
| 后端目录 | `apps/backend/` |
| 小程序根配置 | `project.config.json` |
| Docker 开发栈 | `infra/docker/compose.yaml` |
| 文档站目录 | `docs/` |

## 代码放置规则

| 内容 | 目录 |
| --- | --- |
| 小程序页面 | `apps/miniapp/pages/` |
| demo 假数据 | `apps/miniapp/mock/` |
| 本地状态与持久化 | `apps/miniapp/store/` |
| 页面对外取数逻辑 | `apps/miniapp/services/` |
| 小程序配置 | `apps/miniapp/config/` |
| 管理后台页面与组件 | `apps/admin/src/` |
| 后端 API 与配置 | `apps/backend/app/` |
| Docker 与本地基础设施 | `infra/docker/` |
| 稳定数据契约 | `packages/types/` |
| 可复用纯函数 | `packages/shared/` |

## 新增开发环境

当前仓库已经补上后台开发的第一版基础骨架：

- `apps/backend/`：FastAPI + SQLAlchemy + Alembic + PostgreSQL
- `apps/admin/`：React + TypeScript + Vite
- `infra/docker/compose.yaml`：本地开发用 `postgres + backend + admin`

第二阶段骨架已经补充：

- Backend 已拆出 `student`、`course`、`order` 三个示例模块
- Admin 已补上基础布局、路由和 API 请求层
- 前后端当前联调路径以 `/api/v1/*` 为起点

当前后端已经进入第一版真实数据层阶段：

- 已落表：`students`、`courses`、`enrollments`、`orders`
- 已补初始 Alembic migration
- 本地开发环境启动时会自动确保表存在，并写入最小 demo 数据用于联调
- 当前已支持：`students/profile`、`students/courses`、`courses/catalog`、`orders`

当前也已经开始为“教材内容管理”补第一版数据模型，供后续上传和发布功能使用：

- `teaching_materials`：教材主体，例如 `Marugoto Starter A1`
- `material_units`：教材下的单元，例如 `Topic 1`
- `material_items`：单元下的内容块，例如讲义、音频、作业
- `media_assets`：上传后的资源文件，例如 PDF、音频、图片
- `material_publish_records`：教材版本与发布记录

这套结构的目标不是“上传一个压缩包就结束”，而是：

- 先建教材
- 再拆单元
- 再给单元挂资源
- 最后走发布与版本管理

当前教材内容除了数据库结构外，也开始统一一份标准 JSON 导出格式，作为后续内容协作、版本包和批量导入的基础：

- 导出接口：`GET /api/v1/materials/library/{material_id}/json`
- 当前默认导出版本：`kotobalink.material.v2`
- 目标：统一教材、单元、section、资源引用和发布信息的交换格式
- 原则：`JSON` 用于内容规范与导入导出，`PostgreSQL` 继续作为运行时存储
- 下一版教材模板草案见 [教材 JSON Schema（草案）](./material-json-schema.md)

### 推荐启动方式

优先使用 Docker Compose 启动整套本地环境：

```bash
docker compose -f infra/docker/compose.yaml up --build
```

当前容器栈已经具备基础健康检查：

- `postgres` 通过 `pg_isready` 检查
- `backend` 通过 `GET /health` 检查
- `admin` 通过首页 HTTP 响应检查

当前约束：

- `apps/admin/pnpm-lock.yaml` 作为前端依赖锁文件必须提交
- `node_modules` 与 `pnpm store` 通过 Docker 命名卷隔离，不写回仓库
- 本地不要手动把依赖缓存目录提交进 Git

默认本地地址：

- Admin：`http://localhost:5173`
- Backend：`http://localhost:8000`
- API Docs：`http://localhost:8000/docs`
- Health Check：`http://localhost:8000/health`

### 单独启动管理后台

```bash
pnpm install
pnpm admin:dev
```

### 单独启动后端

```bash
cd apps/backend
python -m venv .venv
.venv\Scripts\activate
pip install -e .[dev]
uvicorn app.main:app --reload
```

### 数据库说明

- 本地默认数据库为 PostgreSQL
- 默认连接串定义在 `infra/docker/.env.example`
- 后端通过 `DATABASE_URL` 读取数据库连接
- 后续表结构迁移统一通过 Alembic 管理

## 当前约束

- 新页面注册到 `apps/miniapp/app.json`
- 不在 `apps/` 之外新增应用代码
- 不向 `apps/miniapp/utils/` 继续堆放业务逻辑
- 页面不直接读取 `mock/`
- 依赖 `wx.*` 的逻辑不进入共享包
- `pages/legacy/` 不作为正式业务目录使用
- 后端领域模块后续按业务域继续拆分，不把全部逻辑堆进 `app/main.py`
- Admin 与 Backend 的环境变量统一从 `infra/docker/` 维护示例

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
- [教材 JSON Schema（草案）](./material-json-schema.md)
- [当前稳定基线](./architecture/current-stable-baseline.md)
- `docs/ja/detailed-design/`
