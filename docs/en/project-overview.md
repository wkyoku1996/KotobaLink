# Project Overview

## Project Name

KotobaLink

## Current Stage

KotobaLink is currently centered on a WeChat miniapp demo.

The repository has already been migrated from a single-miniapp layout to a multi-app workspace layout. Planned additions include:
- Web frontend
- Admin console
- Backend service

The miniapp is the current runnable application.

## Current Runnable App

- Miniapp root directory: `apps/miniapp`
- Directory opened in WeChat DevTools: repository root `KotobaLink`
- WeChat project config entry: `project.config.json`

## Current Product Scope

The current demo covers the main learning-service flows:
- Home overview
- Course list and course detail
- Tasks and homework
- Message center
- Profile and membership
- Schedule
- Activities
- Payment result
- Lesson and assessment detail

## Current Repository Goal

This repository is used to carry future development in a single structure.

Current scope:
- Keep miniapp development active
- Reduce coupling among demo data, state, and pages
- Maintain a stable shared layer for future multi-app development
- Maintain project documentation and handoff materials

## Current Repository Structure

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

## Current Technical Direction

- `apps/miniapp` stores miniapp-specific code
- `packages/types` stores stable data contracts
- `packages/shared` stores reusable pure functions
- `docs` stores project and architecture documentation
