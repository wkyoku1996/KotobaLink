# Shared Layer Extraction Plan

## Goal

Gradually move the repository from a miniapp-local utility model to a reusable shared-package model.

## Current Problem

`apps/miniapp/utils/demo-data.js` used to mix the following responsibilities:
- base mock data
- local state persistence
- date utilities
- pure mapping functions
- page-facing selectors
- domain projection logic

## Target Split

### Into `packages/types`

Stable contracts:
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

### Into `packages/shared`

Pure logic:
- `formatDateKey`
- week-range handling
- schedule sorting
- score conversion
- message sorting
- course and lesson mapping logic
