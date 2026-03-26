# Miniapp Integration Status

This file tracks which miniapp pages currently use backend APIs and which still use demo-only data.

## Backend-connected pages

- `pages/tab/course/index`: backend
- `pages/account/profile-course-detail/index`: backend
- `pages/catalog/course-detail/index`: mixed page, course bundle from backend, purchase state and schedule lesson lookup still use demo state
- `pages/learning/lesson-detail/index`: backend
- `pages/learning/assessment-detail/index`: backend

## Demo-only pages

- `pages/tab/home/index`
- `pages/tab/task/index`
- `pages/tab/messages/index`
- `pages/tab/profile/index`
- `pages/learning/schedule/index`
- `pages/learning/homework/index`
- `pages/engagement/activity/index`
- `pages/commerce/payment/index`
- `pages/account/membership/index`

## Current integration rule

- When `API_BASE_URL` points to localhost, course APIs may fall back to demo data for local-only development.
- When `API_BASE_URL` points to EC2 or another remote host, course APIs do not silently fall back to demo data.
- This keeps remote integration honest and makes API failures visible in the console.
