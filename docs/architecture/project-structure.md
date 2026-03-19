# Project Structure Blueprint

## Goal

Build a repository structure that can support long-term parallel development for:
- WeChat Mini Program
- User-facing web frontend
- Admin backend frontend
- Backend services
- Shared business models, API contracts, and tooling

The structure must be:
- Stable enough for long-term growth
- Flexible enough for phased migration
- Clear enough for multiple developers to collaborate without creating new coupling

## Recommended Top-Level Layout

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

## Directory Responsibilities

### `apps/`

Application entrypoints. Each app must be independently buildable and deployable.

#### `apps/miniapp`
- WeChat Mini Program source
- Mini Program-specific configuration
- Mini Program-only components and pages
- Adapter code that maps shared domain data into Mini Program views

Current repository status:
- The Mini Program has already been migrated into `apps/miniapp`
- WeChat DevTools should open `KotobaLink`
- `project.config.json` uses `miniprogramRoot: "apps/miniapp/"`

Suggested internal layout:

```text
apps/miniapp/
  app.js
  app.json
  app.wxss
  pages/
  templates/
  utils/
  sitemap.json
```

#### `apps/web`
- User-facing web application
- Consumer-facing course, schedule, message, and membership flows

Suggested internal layout:

```text
apps/web/
  src/
    app/
    pages/
    components/
    features/
    services/
    store/
    styles/
```

#### `apps/admin`
- Admin system for operations, course management, orders, members, teachers, activity management, and analytics

Suggested internal layout:

```text
apps/admin/
  src/
    app/
    pages/
    components/
    features/
    services/
    store/
    permissions/
```

#### `apps/backend`
- Backend service entrypoint
- REST or RPC APIs
- Authentication, authorization, domain services, persistence, jobs, and integrations

Suggested internal layout:

```text
apps/backend/
  src/
    modules/
      user/
      course/
      lesson/
      assessment/
      message/
      membership/
      activity/
      order/
    common/
    config/
    jobs/
    database/
    tests/
```

### `packages/`

Cross-application shared code. This is the main layer that preserves high adaptability.

#### `packages/types`
- Shared domain types
- DTOs
- API request and response contracts
- Event payloads

#### `packages/shared`
- Pure shared business helpers
- Date formatting
- status mapping
- constants
- validation helpers

Rules:
- No platform APIs
- No UI framework dependencies
- Keep it portable across backend, web, and miniapp

#### `packages/api-client`
- Shared API request wrappers
- Typed endpoint definitions
- Query key conventions
- Mock adapters if needed

#### `packages/ui`
- Shared UI design tokens
- Reusable web/admin components

Note:
- Do not force Mini Program UI into this package unless it genuinely shares implementation
- Mini Program usually shares tokens and interaction specs, not actual components

#### `packages/config`
- Shared lint rules
- tsconfig presets
- prettier config
- stylelint config
- commitlint or release rules

### `docs/`

Structured documentation instead of loose notes.

#### `docs/architecture`
- Monorepo decisions
- module boundaries
- data flow
- integration rules
- migration plans

#### `docs/product`
- Business flow maps
- page inventories
- roles and permissions
- core scenarios

#### `docs/api`
- API contracts
- auth rules
- error code conventions
- versioning notes

#### `docs/ops`
- deployment instructions
- environment setup
- release process
- rollback and incident notes

### `infra/`

Operational infrastructure and environment assets.

Examples:
- Docker
- Nginx
- CI/CD definitions
- SQL migrations or seed scripts
- container deployment templates

### `scripts/`

Repository-level automation.

Examples:
- bootstrap scripts
- code generation
- type generation from API schema
- mock data sync
- release helpers

### `tests/`

Cross-app or integrated test assets.

Examples:
- E2E scenarios
- integration fixtures
- shared mock payloads

### `legacy/`

Temporary migration holding area.

Use this only if needed during transition. It helps avoid breaking current work while extracting code into the new structure.

## Structural Principles

### 1. Organize by product surface at the app layer

Use `apps/*` for deployable products:
- Mini Program
- user web
- admin
- backend

This makes ownership, build pipelines, and deployment boundaries explicit.

### 2. Organize by domain in shared and backend layers

Core domains for this project likely include:
- user
- course
- lesson
- assessment
- message
- membership
- activity
- order

These same domains should appear consistently in backend modules, shared types, API naming, and admin features.

### 3. Keep platform code separate from domain code

Examples:
- `wx.navigateTo` belongs in Mini Program app code
- HTTP controllers belong in backend
- Course status mapping logic belongs in shared packages if used by multiple apps

This separation is what keeps the structure adaptable when more clients are added later.

### 4. Prefer phased migration over big-bang movement

The first physical migration has already been completed by moving the Mini Program into `apps/miniapp`.

Recommended migration order:
1. Freeze top-level target structure
2. Introduce `apps/`, `packages/`, and `docs/`
3. Extract shared types and pure utilities out of current `utils/`
4. Move Mini Program into `apps/miniapp`
5. Start web, admin, and backend against the same shared domain layer

## Immediate Migration Recommendation For This Repository

The Mini Program has already been relocated.

Current recommendation:
1. Keep WeChat configuration stable at `KotobaLink/project.config.json`
2. Continue extracting reusable code into `packages/`
3. Start new web, admin, and backend code directly inside `apps/*`
4. Avoid introducing new root-level Mini Program code outside `apps/miniapp`

## Suggested First Shared Packages

When extraction starts, prioritize these:
- `packages/types`: course, lesson, assessment, message, membership, activity, order
- `packages/shared`: date helpers, formatting helpers, status enums, mapping helpers
- `packages/api-client`: typed API wrappers for web, admin, and miniapp

## Suggested Governance Rules

To preserve adaptability over time:
- New cross-app business logic must not be added directly to `apps/*`
- New shared code must be platform-agnostic before entering `packages/shared`
- Backend contracts must be reflected in `packages/types`
- Admin and web must consume domain models, not duplicate ad hoc local types
- Mini Program-specific UI logic must stay inside `apps/miniapp`

## What Should Stay Out Of The Root

Avoid placing new business code directly in repository root.

The root should contain:
- workspace config
- repository docs
- global scripts
- top-level governance files

Everything else should live under `apps/`, `packages/`, `docs/`, `infra/`, `scripts/`, or `tests/`.

## Current Compatibility Note

The Mini Program still depends on internal relative paths inside `apps/miniapp`, including:
- `app.js`
- `app.json`
- `app.wxss`
- `pages/`
- `utils/`
- `templates/`

Those paths should stay stable while shared logic is extracted into `packages/`.
