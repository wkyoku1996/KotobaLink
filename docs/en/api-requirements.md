# Upcoming API Requirements

## Document Purpose

This document lists the backend APIs required to gradually turn the current demo into a real project.

The list is organized by business domain rather than by final protocol format.

## 1. User and Identity

Endpoints:
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `GET /students/profile`
- `GET /students/growth-summary`

## 2. Course Catalog and Enrolled Courses

Endpoints:
- `GET /courses/catalog`
- `GET /courses/catalog/:courseId`
- `GET /students/courses`
- `GET /students/courses/:courseId`

## 3. Schedule and Lessons

Endpoints:
- `GET /schedule/week`
- `GET /schedule/day`
- `GET /courses/:courseId/lessons`
- `GET /courses/:courseId/lessons/:lessonId`

## 4. Assessments and Growth Records

Endpoints:
- `GET /courses/:courseId/assessments`
- `GET /courses/:courseId/assessments/:assessmentId`
- `GET /students/growth/radar`
- `GET /students/growth/trend`
- `GET /students/growth/milestones`

## 5. Tasks and Homework

Endpoints:
- `GET /tasks/daily`
- `POST /tasks/daily/vocab/:wordId/complete`
- `POST /tasks/daily/check-in`
- `GET /homeworks/current`
- `POST /homeworks/:homeworkId/submissions`
- `GET /homeworks/:homeworkId/feedback`

## 6. Message Center

Endpoints:
- `GET /notifications`
- `GET /notifications/:notificationId`
- `POST /notifications/:notificationId/read`
- `POST /notifications/read-all`

## 7. Activities

Endpoints:
- `GET /activities`
- `GET /activities/:activityId`
- `POST /activities/:activityId/signup`
- `POST /activities/:activityId/cancel`
- `GET /activities/:activityId/registration`

## 8. Orders and Payments

Endpoints:
- `POST /orders`
- `GET /orders/:orderId`
- `POST /orders/:orderId/pay`
- `GET /payments/:paymentId/status`
- `GET /students/orders`

## 9. Membership

Endpoints:
- `GET /memberships/current`
- `GET /memberships/plans`
- `POST /memberships/orders`
- `GET /memberships/orders/:orderId`
