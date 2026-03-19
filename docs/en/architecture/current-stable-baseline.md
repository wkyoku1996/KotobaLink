# Current Stable Baseline

## Repository Root

The repository is currently organized as a multi-app workspace.

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

## WeChat Miniapp Entry

- WeChat DevTools should open the `KotobaLink` repository root
- The miniapp root is configured in `project.config.json`
- `miniprogramRoot` points to `apps/miniapp/`

## Miniapp Internal Boundaries

The current responsibility split inside `apps/miniapp/` is:

- `pages/`: page entry points grouped by business domain
- `services/`: page-facing data access entry points
- `store/`: local state and persistence
- `mock/`: demo mock data and composition logic
- `config/`: demo constants and local config
- `behaviors/`: reusable miniapp behaviors
- `templates/`: shared WXML fragments
- `utils/`: compatibility-only layer
