# Project Structure Blueprint

## Goal

Maintain a repository structure that supports long-term parallel development across:
- WeChat miniapp
- web frontend
- admin frontend
- backend service
- shared business models, API contracts, and tooling

## Target Top-Level Structure

```text
root/
  apps/
    miniapp/
    web/
    admin/
    backend/
  packages/
    shared/
    types/
    api-client/
    ui/
    config/
  docs/
    architecture/
    product/
    api/
    ops/
  infra/
  scripts/
  tests/
  legacy/
```

## Main Rules

- `apps/*` represents independently buildable and deployable applications
- `packages/*` represents code shared across applications
- `docs/` represents structured project documentation
- new miniapp business code should not be added at the repository root
