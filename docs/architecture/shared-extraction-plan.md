# Shared Extraction Plan

## Objective

Move the repository away from a Mini Program-local utility model and toward reusable shared packages without breaking the current Mini Program.

## Current Problem

`apps/miniapp/utils/demo-data.js` currently mixes several responsibilities:
- base mock data
- local state persistence
- date helpers
- pure mappers
- page-oriented selectors
- domain-specific projections

This makes it hard to reuse logic across:
- Mini Program
- web
- admin
- backend

## Target Split

### Move into `packages/types`

Contracts for:
- student
- teacher
- course
- enrolled course
- lesson
- assessment
- notification
- membership plan
- activity
- payment order
- demo state

### Move into `packages/shared`

Pure logic for:
- `formatDateKey`
- week range helpers
- schedule sorting
- score normalization
- message sorting
- course and lesson mapping helpers

### Keep in Mini Program for now

Stay in current app code until platform migration:
- `wx.getStorageSync`
- `wx.setStorageSync`
- page refresh glue
- `Page(...)` data orchestration
- Mini Program navigation behavior

## Recommended Extraction Order

1. Extract shared date helpers
2. Extract score and formatting helpers
3. Extract message sorting and mapping helpers
4. Extract course and lesson projection helpers
5. Extract state storage into future `apps/miniapp` store layer
6. Replace remaining `apps/miniapp/utils` dependencies with shared package imports

## Safe Migration Rule

No function should be moved into `packages/shared` unless it can run unchanged in:
- backend
- web
- admin
- miniapp

If it depends on `wx`, it stays out.
