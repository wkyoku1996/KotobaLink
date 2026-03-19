# `@workspace/types`

Shared domain types live here.

This package is the contract layer between:
- `apps/backend`
- `apps/web`
- `apps/admin`
- `apps/miniapp`

## Purpose

Put only data contracts here:
- domain entities
- DTOs
- request and response shapes
- enum-like status definitions
- query parameter shapes

## Rules

- No platform APIs
- No UI code
- No storage access
- No business side effects
- No formatting logic

## Suggested Structure

```text
packages/types/
  src/
    common/
    user/
    course/
    lesson/
    assessment/
    message/
    membership/
    activity/
    order/
```

## First Extraction Targets From Current Mini Program

Based on the current codebase, the first domain contracts should cover:
- student profile
- course catalog item
- enrolled course
- lesson
- assessment
- message notification
- membership plan
- activity
- demo state shape

Current extracted contract exports:
- `src/activity/contracts.js`
- `src/assessment/contracts.js`
- `src/common/statuses.js`
- `src/course/contracts.js`
- `src/lesson/contracts.js`
- `src/message/contracts.js`
- `src/order/contracts.js`
- `src/user/contracts.js`
