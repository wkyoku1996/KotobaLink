import { defineConfig } from 'vitepress'

const search = {
  provider: 'local',
} as const

const zhNav = [
  { text: '项目概览', link: '/project-overview' },
  { text: '页面清单', link: '/page-inventory' },
  { text: '数据架构', link: '/data-architecture' },
  { text: '架构说明', link: '/architecture/current-stable-baseline' },
]

const zhSidebar = [
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
      { text: '产品需求说明', link: '/product-requirements' },
      { text: '数据实体设计', link: '/data-entities' },
      { text: '接口字段契约说明', link: '/api-field-contracts' },
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
    items: [{ text: '文档站方案', link: '/docs-site-plan' }],
  },
]

const jaNav = [
  { text: '概要', link: '/ja/project-overview' },
  { text: 'ページ一覧', link: '/ja/page-inventory' },
  { text: 'データ構成', link: '/ja/data-architecture' },
  { text: 'アーキテクチャ', link: '/ja/architecture/current-stable-baseline' },
]

const jaSidebar = [
  {
    text: '基本文書',
    items: [
      { text: 'プロジェクト概要', link: '/ja/project-overview' },
      { text: 'ページ一覧', link: '/ja/page-inventory' },
      { text: 'データ構成', link: '/ja/data-architecture' },
      { text: '開発ガイド', link: '/ja/development-guide' },
      { text: '現在の安定基線', link: '/ja/architecture/current-stable-baseline' },
      { text: '翻訳範囲', link: '/ja/translation-status' },
    ],
  },
]

const enNav = [
  { text: 'Overview', link: '/en/project-overview' },
  { text: 'Pages', link: '/en/page-inventory' },
  { text: 'Data', link: '/en/data-architecture' },
  { text: 'Architecture', link: '/en/architecture/current-stable-baseline' },
]

const enSidebar = [
  {
    text: 'Core Docs',
    items: [
      { text: 'Project Overview', link: '/en/project-overview' },
      { text: 'Page Inventory', link: '/en/page-inventory' },
      { text: 'Data Architecture', link: '/en/data-architecture' },
      { text: 'Development Guide', link: '/en/development-guide' },
      { text: 'Current Stable Baseline', link: '/en/architecture/current-stable-baseline' },
      { text: 'Translation Scope', link: '/en/translation-status' },
    ],
  },
]

export default defineConfig({
  title: 'KotobaLink Docs',
  description: 'KotobaLink project documentation site',
  base: '/KotobaLink/',
  srcDir: '.',
  cleanUrls: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'KotobaLink 文档',
      description: 'KotobaLink 项目文档站',
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        search,
        footer: {
          message: 'KotobaLink 项目文档',
          copyright: 'Copyright 2026 KotobaLink',
        },
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      title: 'KotobaLink ドキュメント',
      description: 'KotobaLink プロジェクトのドキュメントサイト',
      themeConfig: {
        nav: jaNav,
        sidebar: jaSidebar,
        search,
        footer: {
          message: 'KotobaLink プロジェクト文書',
          copyright: 'Copyright 2026 KotobaLink',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'KotobaLink Docs',
      description: 'Documentation site for the KotobaLink project',
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        search,
        footer: {
          message: 'KotobaLink Project Docs',
          copyright: 'Copyright 2026 KotobaLink',
        },
      },
    },
  },
})
