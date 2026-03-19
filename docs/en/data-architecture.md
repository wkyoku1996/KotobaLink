# Data Architecture

## Current Principle

The project separates data responsibilities inside the miniapp while keeping a stable shared layer for future multi-app development.

## Current Layers

### `apps/miniapp/mock`

Used for:
- demo mock data
- seed data for rendered views
- input data for demo composition

Current notes:
- this layer holds demo-oriented data semantics
- this layer does not handle miniapp local storage behavior

### `apps/miniapp/store`

Used for:
- local persistence
- storage-based state
- miniapp-local state update logic

Examples:
- demo state persistence
- accessibility setting state

### `apps/miniapp/services`

Used for:
- data entry points for pages
- coordination between `mock/` and `store/`
- selectors and query interfaces for pages

Current rules:
- pages should read through `services/*`
- pages should not read `mock/` directly

### `apps/miniapp/config`

Used for:
- miniapp-local constants
- demo default configuration
- storage keys
- demo date anchors

### `packages/types`

Used for:
- stable data contracts
- shared field definitions
- status enumerations

### `packages/shared`

Used for:
- cross-app reusable pure functions
- logic that does not depend on `wx.*`
- logic that does not read or write storage

## Content Kept Inside the Miniapp

The following content remains inside the miniapp.
- page view models
- page navigation behavior
- storage-based glue logic
- demo-specific presentation logic
- accessibility behaviors
