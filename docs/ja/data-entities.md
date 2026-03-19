# データエンティティ設計

## 文書目的

この文書は、現在のプロジェクトで中心となるデータエンティティと、その関係を整理するものです。

## 1. 受講生 Student

主要フィールド:
- `id`
- `name`
- `avatar`
- `level`
- `currentCourse`
- `className`
- `membershipStatus`
- `membershipExpireAt`

## 2. コース Course

主要フィールド:
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

## 3. 受講 Enrollment

主要フィールド:
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

## 4. lesson

主要フィールド:
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

## 5. assessment

主要フィールド:
- `id`
- `courseId`
- `title`
- `type`
- `date`
- `score`
- `summary`
- `feedback`

## 6. 宿題 Homework

主要フィールド:
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

## 7. 通知 Notification

主要フィールド:
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

## 8. イベント Activity

主要フィールド:
- `id`
- `title`
- `summary`
- `date`
- `location`
- `status`
- `capacity`
- `signedUpCount`

## 9. 注文 Order

主要フィールド:
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

## 10. 会員 Membership

主要フィールド:
- `id`
- `studentId`
- `planName`
- `status`
- `expireAt`
- `benefits`

## 11. 成長記録 GrowthRecord

主要フィールド:
- `studentId`
- `scoreTrend`
- `skillRadar`
- `previousSkillRadar`
- `milestones`
- `teacherSnapshot`
- `assessments`
