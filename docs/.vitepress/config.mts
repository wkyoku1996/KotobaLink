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
  { text: '詳細設計', link: '/ja/detailed-design/' },
  { text: 'アーキテクチャ', link: '/ja/architecture/current-stable-baseline' },
]

const jaSidebar = [
  {
    text: 'プロジェクト文書',
    items: [
      { text: 'プロジェクト概要', link: '/ja/project-overview' },
      { text: 'ページ一覧', link: '/ja/page-inventory' },
      { text: 'データ構成', link: '/ja/data-architecture' },
      { text: '現在の Demo 機能', link: '/ja/demo-features' },
      { text: '機能クローズドループ', link: '/ja/feature-closed-loops' },
      { text: 'Demo から正式版への移行', link: '/ja/project-transition-plan' },
      { text: '今後の API 一覧', link: '/ja/api-requirements' },
      { text: '製品要求仕様', link: '/ja/product-requirements' },
      { text: 'データエンティティ設計', link: '/ja/data-entities' },
      { text: 'API フィールド契約', link: '/ja/api-field-contracts' },
      { text: '開発ガイド', link: '/ja/development-guide' },
    ],
  },
  {
    text: '詳細設計',
    items: [
      { text: '詳細設計トップ', link: '/ja/detailed-design/' },
      { text: '記述ルール', link: '/ja/detailed-design/component-document-rules' },
      { text: 'コンポーネント一覧', link: '/ja/detailed-design/component-inventory' },
    ],
  },
  {
    text: '詳細設計: ページ',
    items: [
      { text: 'ホーム', link: '/ja/detailed-design/pages/home-page' },
      { text: 'コース', link: '/ja/detailed-design/pages/course-page' },
      { text: 'タスク', link: '/ja/detailed-design/pages/task-page' },
      { text: 'メッセージ', link: '/ja/detailed-design/pages/messages-page' },
      { text: 'マイページ', link: '/ja/detailed-design/pages/profile-page' },
      { text: 'スケジュール', link: '/ja/detailed-design/pages/schedule-page' },
      { text: '宿題', link: '/ja/detailed-design/pages/homework-page' },
      { text: 'イベント', link: '/ja/detailed-design/pages/activity-page' },
      { text: '決済完了', link: '/ja/detailed-design/pages/payment-page' },
      { text: 'コース詳細', link: '/ja/detailed-design/pages/catalog-course-detail-page' },
      { text: '受講中コース詳細', link: '/ja/detailed-design/pages/enrolled-course-detail-page' },
      { text: 'レッスン詳細', link: '/ja/detailed-design/pages/lesson-detail-page' },
      { text: '評価詳細', link: '/ja/detailed-design/pages/assessment-detail-page' },
      { text: '会員プラン', link: '/ja/detailed-design/pages/membership-page' },
    ],
  },
  {
    text: '詳細設計: 共通部品',
    items: [
      { text: 'Hero Card', link: '/ja/detailed-design/components/shared/hero-card' },
      { text: 'Section Card', link: '/ja/detailed-design/components/shared/section-card' },
      { text: 'Accessibility Controls', link: '/ja/detailed-design/components/shared/accessibility-controls' },
    ],
  },
  {
    text: '詳細設計: ホーム',
    items: [
      { text: 'Hero Summary', link: '/ja/detailed-design/components/home/home-hero-summary' },
      { text: 'Skill Radar', link: '/ja/detailed-design/components/home/home-skill-radar' },
      { text: 'Upcoming Schedule', link: '/ja/detailed-design/components/home/home-upcoming-schedule' },
      { text: 'Activity Entry', link: '/ja/detailed-design/components/home/home-activity-entry' },
      { text: 'Daily Task', link: '/ja/detailed-design/components/home/home-daily-task' },
    ],
  },
  {
    text: '詳細設計: コース',
    items: [
      { text: 'Hero Summary', link: '/ja/detailed-design/components/course/course-hero-summary' },
      { text: '受講中コース一覧', link: '/ja/detailed-design/components/course/course-enrolled-list' },
      { text: '購入可能コース一覧', link: '/ja/detailed-design/components/course/course-purchasable-list' },
      { text: '詳細 Hero Summary', link: '/ja/detailed-design/components/catalog/catalog-hero-summary' },
      { text: '現在レッスンカード', link: '/ja/detailed-design/components/catalog/catalog-current-lesson' },
      { text: 'コース基本情報', link: '/ja/detailed-design/components/catalog/catalog-course-info' },
      { text: 'クラス基本情報', link: '/ja/detailed-design/components/catalog/catalog-class-info' },
      { text: '講師情報', link: '/ja/detailed-design/components/catalog/catalog-teacher-info' },
      { text: 'レッスン一覧', link: '/ja/detailed-design/components/catalog/catalog-lesson-list' },
      { text: '評価概要', link: '/ja/detailed-design/components/catalog/catalog-assessment-overview' },
      { text: '購入操作エリア', link: '/ja/detailed-design/components/catalog/catalog-purchase-action' },
      { text: '受講中 Hero Summary', link: '/ja/detailed-design/components/enrolled/enrolled-hero-summary' },
      { text: '受講中コース情報', link: '/ja/detailed-design/components/enrolled/enrolled-course-info' },
      { text: '受講中クラス情報', link: '/ja/detailed-design/components/enrolled/enrolled-class-info' },
      { text: '受講中講師情報', link: '/ja/detailed-design/components/enrolled/enrolled-teacher-info' },
      { text: '受講中レッスン一覧', link: '/ja/detailed-design/components/enrolled/enrolled-lesson-list' },
      { text: '受講中評価一覧', link: '/ja/detailed-design/components/enrolled/enrolled-assessment-list' },
    ],
  },
  {
    text: '詳細設計: タスク / メッセージ',
    items: [
      { text: 'タスク Hero Summary', link: '/ja/detailed-design/components/task/task-hero-summary' },
      { text: '単語一覧', link: '/ja/detailed-design/components/task/task-vocab-list' },
      { text: '打刻状態', link: '/ja/detailed-design/components/task/task-checkin-status' },
      { text: '単語詳細モーダル', link: '/ja/detailed-design/components/task/task-word-modal' },
      { text: 'メッセージ Hero Summary', link: '/ja/detailed-design/components/messages/messages-hero-summary' },
      { text: '分類フィルタ', link: '/ja/detailed-design/components/messages/messages-filter-chips' },
      { text: 'メッセージ一覧', link: '/ja/detailed-design/components/messages/messages-list' },
      { text: '詳細モーダル', link: '/ja/detailed-design/components/messages/messages-detail-modal' },
    ],
  },
  {
    text: '詳細設計: マイページ',
    items: [
      { text: 'Hero Summary', link: '/ja/detailed-design/components/profile/profile-hero-summary' },
      { text: '学習アーカイブ', link: '/ja/detailed-design/components/profile/profile-archive-summary' },
      { text: '成長サマリー', link: '/ja/detailed-design/components/profile/profile-growth-summary' },
      { text: '成績推移グラフ', link: '/ja/detailed-design/components/profile/profile-trend-chart' },
      { text: 'スキルレーダー', link: '/ja/detailed-design/components/profile/profile-skill-radar' },
      { text: '評価一覧', link: '/ja/detailed-design/components/profile/profile-assessment-list' },
      { text: 'マイルストーン', link: '/ja/detailed-design/components/profile/profile-milestone-list' },
      { text: '講師サマリー', link: '/ja/detailed-design/components/profile/profile-teacher-summary' },
    ],
  },
  {
    text: '詳細設計: 学習フロー',
    items: [
      { text: 'スケジュール Hero Summary', link: '/ja/detailed-design/components/schedule/schedule-hero-summary' },
      { text: '週間ボード', link: '/ja/detailed-design/components/schedule/schedule-weekly-board' },
      { text: '宿題内容カード', link: '/ja/detailed-design/components/homework/homework-content-card' },
      { text: '宿題提出結果', link: '/ja/detailed-design/components/homework/homework-submit-result' },
      { text: 'レッスン Hero Summary', link: '/ja/detailed-design/components/lesson/lesson-hero-summary' },
      { text: 'レッスン基本情報', link: '/ja/detailed-design/components/lesson/lesson-basic-info' },
      { text: '大綱一覧', link: '/ja/detailed-design/components/lesson/lesson-outline-list' },
      { text: '重要単語', link: '/ja/detailed-design/components/lesson/lesson-vocab-list' },
      { text: '重要文法', link: '/ja/detailed-design/components/lesson/lesson-grammar-list' },
      { text: '演習パネル', link: '/ja/detailed-design/components/lesson/lesson-practice-panel' },
      { text: '評価 Hero Summary', link: '/ja/detailed-design/components/assessment/assessment-hero-summary' },
      { text: '評価情報カード', link: '/ja/detailed-design/components/assessment/assessment-info-card' },
      { text: '設問一覧', link: '/ja/detailed-design/components/assessment/assessment-question-list' },
    ],
  },
  {
    text: '詳細設計: 活動 / 決済 / 会員',
    items: [
      { text: 'イベント Hero Summary', link: '/ja/detailed-design/components/activity/activity-hero-summary' },
      { text: 'イベント情報・申込カード', link: '/ja/detailed-design/components/activity/activity-info-signup-card' },
      { text: '決済 Hero Summary', link: '/ja/detailed-design/components/payment/payment-hero-summary' },
      { text: '注文情報カード', link: '/ja/detailed-design/components/payment/payment-order-info-card' },
      { text: '会員 Hero Summary', link: '/ja/detailed-design/components/membership/membership-hero-summary' },
      { text: '現在の特典', link: '/ja/detailed-design/components/membership/membership-benefits-card' },
      { text: 'プラン一覧', link: '/ja/detailed-design/components/membership/membership-plan-list' },
    ],
  },
  {
    text: 'アーキテクチャ文書',
    items: [
      { text: '現在の安定基線', link: '/ja/architecture/current-stable-baseline' },
      { text: 'Miniapp 境界', link: '/ja/architecture/miniapp-boundaries' },
      { text: 'プロジェクト構造ブループリント', link: '/ja/architecture/project-structure' },
      { text: '共有層抽出計画', link: '/ja/architecture/shared-extraction-plan' },
    ],
  },
  {
    text: '文書サイト',
    items: [
      { text: '文書サイト計画', link: '/ja/docs-site-plan' },
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
      { text: 'Current Demo Features', link: '/en/demo-features' },
      { text: 'Feature Closed Loops', link: '/en/feature-closed-loops' },
      { text: 'Demo To Production Transition', link: '/en/project-transition-plan' },
      { text: 'Upcoming API Requirements', link: '/en/api-requirements' },
      { text: 'Product Requirements', link: '/en/product-requirements' },
      { text: 'Data Entity Design', link: '/en/data-entities' },
      { text: 'API Field Contracts', link: '/en/api-field-contracts' },
      { text: 'Development Guide', link: '/en/development-guide' },
    ],
  },
  {
    text: 'Architecture Docs',
    items: [
      { text: 'Current Stable Baseline', link: '/en/architecture/current-stable-baseline' },
      { text: 'Miniapp Boundaries', link: '/en/architecture/miniapp-boundaries' },
      { text: 'Project Structure Blueprint', link: '/en/architecture/project-structure' },
      { text: 'Shared Layer Extraction Plan', link: '/en/architecture/shared-extraction-plan' },
    ],
  },
  {
    text: 'Docs Site',
    items: [
      { text: 'Docs Site Plan', link: '/en/docs-site-plan' },
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
