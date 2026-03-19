# `@workspace/shared`

Pure shared business helpers live here.

This package exists for logic that can be reused by:
- backend services
- web frontend
- admin frontend
- miniapp

## Purpose

Put portable logic here:
- date helpers
- formatters
- constants
- status mapping
- pure domain transformers
- validation helpers

## Rules

- No `wx.*`
- No browser globals
- No Node-only side effects unless explicitly isolated
- No storage reads or writes
- No UI components

If a function needs platform APIs, it does not belong here.

## Suggested Structure

```text
packages/shared/
  src/
    constants/
    date/
    formatting/
    validation/
    mappers/
    domain/
```

## First Extraction Targets From Current Mini Program

High-value portable candidates from current `utils/demo-data.js`:
- date key formatting
- schedule sorting
- score conversion
- message sorting
- lesson/course projection helpers

Current extracted modules:
- `src/date/date-key.js`
- `src/formatting/score.js`
- `src/domain/schedule.js`
- `src/domain/messages.js`

Not suitable for this package yet:
- local storage access
- `wx` state persistence
- Mini Program navigation
- page-specific view state
