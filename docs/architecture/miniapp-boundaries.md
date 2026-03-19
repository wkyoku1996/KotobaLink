# Miniapp Boundaries

## Purpose

This document defines what should stay inside `apps/miniapp` and what should move out over time.

## Keep Inside `apps/miniapp`

- anything that calls `wx.*`
- page navigation
- `Page(...)` lifecycle orchestration
- accessibility behaviors and template wiring
- Mini Program-only presentation state
- temporary demo glue code

## Move to `packages/shared` When Stable

- pure date helpers
- score normalization
- message sorting
- schedule ordering
- other pure business transforms with no platform dependency

## Move to `packages/types` When Stable

- domain field contracts
- enum-like status lists
- API payload shapes
- query parameter contracts

## Keep in `mock/`

- demo fixtures
- temporary seed content
- showcase-specific copy and combinations

## Keep in `store/`

- local persistence keys
- demo state mutation helpers
- storage-backed UI state

## Keep in `services/`

- Mini Program-facing selector APIs
- orchestration between `mock/` and `store/`
- future adapter layer from real backend API responses to Mini Program view data

## Practical Rule

If removing `wx` from a file would fundamentally change how it works, it should stay in `apps/miniapp`.
