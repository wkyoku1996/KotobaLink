# Development Guide

## Current Development Entry

Use the following entry points when developing the miniapp.

1. Open the repository root `KotobaLink` in WeChat DevTools
2. The miniapp source is resolved from `project.config.json`
3. `miniprogramRoot` points to `apps/miniapp/`

## Current Development Rules

### When adding miniapp pages

- Place pages under the corresponding domain inside `apps/miniapp/pages/`
- Register enabled pages in `apps/miniapp/app.json`
- Do not place new pages at the repository root

### When adding data logic

- Put demo mock data in `apps/miniapp/mock/`
- Put storage and local state in `apps/miniapp/store/`
- Put page-facing data access logic in `apps/miniapp/services/`
- Put miniapp-local config in `apps/miniapp/config/`

### When adding shared logic

- Put stable data contracts in `packages/types/`
- Put reusable pure functions in `packages/shared/`
- Do not place `wx.*` dependent logic in shared packages
