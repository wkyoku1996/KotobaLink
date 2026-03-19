# Data Entity Design

## Document Purpose

This document defines the core data entities in the current project and their relationships.

## 1. Student

Core fields:
- `id`
- `name`
- `avatar`
- `level`
- `currentCourse`
- `className`
- `membershipStatus`
- `membershipExpireAt`

## 2. Course

Core fields:
- `id`
- `name`
- `type`
- `duration`
- `price`
- `benefit`
- `summary`
- `teacher`
- `classType`
- `classSchedule`
- `classroom`
- `status`

## 3. Enrollment

Core fields:
- `id`
- `studentId`
- `courseId`
- `courseName`
- `className`
- `teacher`
- `classroom`
- `serviceStatus`
- `lessonProgress`
- `classInfo`

## 4. Lesson

Core fields:
- `id`
- `courseId`
- `title`
- `dateKey`
- `startTime`
- `endTime`
- `status`
- `teacher`
- `classroom`
- `outline`
- `vocab`
- `grammar`

## 5. Assessment

Core fields:
- `id`
- `courseId`
- `title`
- `type`
- `date`
- `score`
- `summary`
- `feedback`

## 6. Homework

Core fields:
- `id`
- `studentId`
- `courseId`
- `lessonId`
- `title`
- `status`
- `submissionType`
- `submittedAt`
- `score`
- `feedback`

## 7. Notification

Core fields:
- `id`
- `studentId`
- `title`
- `type`
- `category`
- `sender`
- `summary`
- `time`
- `tags`
- `important`
- `read`

## 8. Activity

Core fields:
- `id`
- `title`
- `summary`
- `date`
- `location`
- `status`
- `capacity`
- `signedUpCount`

## 9. Order

Core fields:
- `id`
- `studentId`
- `businessType`
- `targetId`
- `courseName`
- `className`
- `teacher`
- `price`
- `benefit`
- `status`
- `paymentStatus`
- `createdAt`
