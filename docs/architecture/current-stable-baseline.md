# Current Stable Baseline

## Repository Root

The repository is now organized as a long-lived multi-app workspace:

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

## WeChat Mini Program Entry

- WeChat DevTools should open the `KotobaLink` directory.
- The Mini Program root is configured through `project.config.json`.
- `miniprogramRoot` points to `apps/miniapp/`.

## Miniapp Internal Boundaries

Inside `apps/miniapp/`, responsibilities are currently split as follows:

- `pages/`: Mini Program page entry files grouped by product domain
- `services/`: Mini Program-facing data access and selector entrypoints
- `store/`: Mini Program local state and persistence
- `mock/`: demo data fixtures and demo-specific assembly logic
- `config/`: demo constants and Mini Program-local configuration
- `behaviors/`: reusable Mini Program behaviors
- `templates/`: shared WXML template fragments
- `utils/`: compatibility layer only

## Current Domain Page Groups

- `pages/tab/`: main tab pages
- `pages/learning/`: schedule, homework, lesson, assessment flows
- `pages/catalog/`: catalog-side course detail
- `pages/account/`: membership and enrolled course detail
- `pages/engagement/`: activity flows
- `pages/commerce/`: payment flows
- `pages/legacy/`: unregistered historical template pages kept only for reference

## Stable Shared Layer

`packages/types` currently holds stable contract exports for:
- user
- course
- lesson
- assessment
- message
- activity
- order
- common statuses

`packages/shared` currently holds portable pure helpers for:
- date key parsing and formatting
- score normalization
- schedule sorting and lesson date formatting
- message sorting and filter counting

## What Is Intentionally Not Shared Yet

The following remain inside `apps/miniapp` on purpose:
- `wx.getStorageSync` / `wx.setStorageSync`
- page navigation
- Mini Program view model assembly
- accessibility behavior wiring
- demo-specific page presentation logic

## Current Stability Goal

The repository is now in a good base state for:
- continuing Mini Program demo development
- starting project documentation work
- adding future `web`, `admin`, and `backend` apps without changing the top-level structure again

The next major phase should be documentation and product definition, not another structural migration.
