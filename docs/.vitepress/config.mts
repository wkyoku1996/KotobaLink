import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'KotobaLink 文档',
  description: 'KotobaLink 项目文档站',
  srcDir: '.',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '项目概览', link: '/project-overview' },
      { text: '页面清单', link: '/page-inventory' },
      { text: '数据架构', link: '/data-architecture' },
      { text: '架构说明', link: '/architecture/current-stable-baseline' },
    ],
    sidebar: [
      {
        text: '项目文档',
        items: [
          { text: '项目概览', link: '/project-overview' },
          { text: '页面清单', link: '/page-inventory' },
          { text: '数据架构', link: '/data-architecture' },
          { text: '当前 Demo 功能说明', link: '/demo-features' },
          { text: '功能闭环路径', link: '/feature-closed-loops' },
          { text: '从 Demo 到正式项目', link: '/project-transition-plan' },
          { text: '后续接口需求清单', link: '/api-requirements' },
          { text: '开发说明', link: '/development-guide' },
        ],
      },
      {
        text: '架构文档',
        items: [
          { text: '当前稳定基线', link: '/architecture/current-stable-baseline' },
          { text: 'Miniapp 边界', link: '/architecture/miniapp-boundaries' },
          { text: '项目结构蓝图', link: '/architecture/project-structure' },
          { text: '共享层提取计划', link: '/architecture/shared-extraction-plan' },
        ],
      },
      {
        text: '文档规划',
        items: [
          { text: '文档站方案', link: '/docs-site-plan' },
        ],
      },
    ],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'KotobaLink 项目文档',
      copyright: 'Copyright 2026 KotobaLink',
    },
  },
})
