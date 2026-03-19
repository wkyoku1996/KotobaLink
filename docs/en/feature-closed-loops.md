# Feature Closed Loops

## Document Purpose

This document describes which features in the current demo already form relatively complete loops and how those loops connect across pages.

## 1. Course Purchase Loop

Path:

1. user enters the `Courses` page
2. user views purchasable courses
3. user opens a course detail page
4. user clicks purchase
5. local purchase state is written
6. user is redirected to the payment result page
7. the course appears under enrolled courses after returning

Related pages:
- `pages/tab/course/index`
- `pages/catalog/course-detail/index`
- `pages/commerce/payment/index`

Related state:
- `purchased`
- `purchasedCourseIds`
- `lastPurchasedCourseId`

## 2. Activity Signup Loop

Path:

1. user enters the activity page from home or schedule
2. user clicks signup
3. signup state is written
4. activity notification content changes
5. an activity item is added to the schedule
6. user can click again to cancel signup

Related state:
- `activitySignedUp`

## 3. Daily Task Loop

Path:

1. user enters the task page
2. user opens vocabulary cards
3. user marks vocabulary as learned
4. user completes the check-in after finishing vocabulary
5. the page updates progress and completion state

Related state:
- `learnedVocabIds`
- `dailyTaskCompleted`

## 4. Homework Submission Loop

Path:

1. user enters the homework page from task or schedule
2. user submits homework
3. submission state is written
4. related pages display the new state

Related state:
- `homeworkSubmitted`

## 5. Message Reading Loop

Path:

1. user enters the message center
2. user filters messages by category
3. user opens a message
4. read state is written
5. the detail view appears
6. unread count and list state update together

Related state:
- `readNotificationIds`
