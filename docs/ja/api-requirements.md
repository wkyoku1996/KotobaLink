# 今後の API 一覧

## 文書目的

この文書は、現在の demo を実プロジェクトへ移行する際に必要となるバックエンド API を業務ドメイン別に整理するものです。

ここでは最終プロトコルではなく、必要なインターフェース項目を列挙します。

## 1. ユーザーと認証

インターフェース項目:
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `GET /students/profile`
- `GET /students/growth-summary`

## 2. コースカタログと受講中コース

インターフェース項目:
- `GET /courses/catalog`
- `GET /courses/catalog/:courseId`
- `GET /students/courses`
- `GET /students/courses/:courseId`

## 3. 時間割と lesson

インターフェース項目:
- `GET /schedule/week`
- `GET /schedule/day`
- `GET /courses/:courseId/lessons`
- `GET /courses/:courseId/lessons/:lessonId`

## 4. assessment と成長記録

インターフェース項目:
- `GET /courses/:courseId/assessments`
- `GET /courses/:courseId/assessments/:assessmentId`
- `GET /students/growth/radar`
- `GET /students/growth/trend`
- `GET /students/growth/milestones`

## 5. タスクと宿題

インターフェース項目:
- `GET /tasks/daily`
- `POST /tasks/daily/vocab/:wordId/complete`
- `POST /tasks/daily/check-in`
- `GET /homeworks/current`
- `POST /homeworks/:homeworkId/submissions`
- `GET /homeworks/:homeworkId/feedback`

## 6. メッセージセンター

インターフェース項目:
- `GET /notifications`
- `GET /notifications/:notificationId`
- `POST /notifications/:notificationId/read`
- `POST /notifications/read-all`

## 7. イベント

インターフェース項目:
- `GET /activities`
- `GET /activities/:activityId`
- `POST /activities/:activityId/signup`
- `POST /activities/:activityId/cancel`
- `GET /activities/:activityId/registration`

## 8. 注文と支払い

インターフェース項目:
- `POST /orders`
- `GET /orders/:orderId`
- `POST /orders/:orderId/pay`
- `GET /payments/:paymentId/status`
- `GET /students/orders`

## 9. 会員体系

インターフェース項目:
- `GET /memberships/current`
- `GET /memberships/plans`
- `POST /memberships/orders`
- `GET /memberships/orders/:orderId`
