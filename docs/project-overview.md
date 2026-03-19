# 项目概览

## 项目名称

KotobaLink

## 当前阶段

KotobaLink 当前以微信小程序 demo 产品为核心。

仓库已经从单一小程序结构升级为多应用工作区结构，方便后续继续扩展：
- Web 前台
- 管理后台
- 后端服务

目前真正可运行的应用只有小程序。

## 当前可运行应用

- 小程序根目录：`apps/miniapp`
- 微信开发者工具打开目录：仓库根目录 `KotobaLink`
- 微信工程配置入口：`project.config.json`

## 当前产品范围

当前 demo 主要覆盖学习服务主流程：
- 首页总览
- 课程列表与课程详情
- 任务与作业
- 消息中心
- 个人中心与会员
- 课表
- 活动
- 支付结果
- lesson 与 assessment 详情

## 当前仓库目标

这个仓库用于以统一结构承载后续长期开发。

当前范围：
- 保持小程序可持续开发
- 降低 demo 数据、状态、页面之间的耦合
- 为未来多端开发预留稳定共享层
- 让项目说明和协作交接更容易

## 当前仓库结构

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

## 当前技术方向

- `apps/miniapp` 保存小程序专属代码
- `packages/types` 保存稳定的数据契约
- `packages/shared` 保存可复用纯函数
- `docs` 保存项目说明与架构文档

## 当前稳定性说明

项目当前状态可支持以下工作：
- 可以继续维护 demo
- 可以继续编写项目说明
- 后续启动 Web、后台、后端时不需要再推翻顶层结构
