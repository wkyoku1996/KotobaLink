# Miniapp Boundaries

## Document Purpose

This document describes which content remains inside `apps/miniapp` and which content moves to shared layers later.

## Content Kept In `apps/miniapp`

- logic that calls `wx.*`
- page navigation
- `Page(...)` lifecycle orchestration
- accessibility behaviors and template binding
- miniapp-specific presentation state
- temporary demo glue code

## Content For `packages/shared`

- date processing
- score conversion
- message sorting
- schedule sorting
- pure business transforms that do not depend on platform APIs

## Content For `packages/types`

- data entity contracts
- status enumerations
- API payload definitions
- query parameter contracts
