# 数据实体设计

## 文档目的

这份文档用于定义当前项目中最核心的数据实体，以及这些实体之间的关系。

这里不是数据库 DDL，而是领域实体层设计，重点是统一业务理解。

## 一、学员 Student

### 作用

表示当前使用学习服务的用户主体。

### 核心字段

- `id`
- `name`
- `avatar`
- `level`
- `currentCourse`
- `className`
- `membershipStatus`
- `membershipExpireAt`

### 主要关联

- 一个学员可以拥有多个已报名课程
- 一个学员可以拥有多个作业记录
- 一个学员可以拥有多个通知消息
- 一个学员可以报名多个活动
- 一个学员可以拥有多个订单

## 二、课程 Course

### 作用

表示课程目录中的标准课程产品。

### 核心字段

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

### 主要关联

- 一个课程包含多个 lesson
- 一个课程包含多个 assessment
- 一个课程可以被多个学员报名
- 一个课程可以对应多个订单

## 三、已报名课程 Enrollment

### 作用

表示“学员与课程”的实际服务关系。

### 核心字段

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

### 说明

正式项目里，`Course` 和 `Enrollment` 应明确区分：
- `Course` 是目录产品
- `Enrollment` 是实际报名与服务交付记录

## 四、课程单元 Lesson

### 作用

表示课程中的单次课时或单元内容。

### 核心字段

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

### 主要关联

- lesson 属于某个课程
- lesson 可以关联作业
- lesson 可以关联教师反馈

## 五、测评 Assessment

### 作用

表示阶段测评、小测或课程考核记录。

### 核心字段

- `id`
- `courseId`
- `title`
- `type`
- `date`
- `score`
- `summary`
- `feedback`

### 主要关联

- assessment 属于某个课程
- assessment 可以汇入学员成长记录

## 六、作业 Homework

### 作用

表示学员在 lesson 或任务流程中的作业内容与提交记录。

### 核心字段

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

### 说明

正式项目里建议把“作业定义”和“作业提交记录”拆开：
- `HomeworkTemplate`
- `HomeworkSubmission`

当前文档阶段先统一以 Homework 理解。

## 七、通知 Notification

### 作用

表示系统、教师、任务、活动等消息提醒。

### 核心字段

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

## 八、活动 Activity

### 作用

表示线下或线上活动。

### 核心字段

- `id`
- `title`
- `summary`
- `date`
- `location`
- `status`
- `capacity`
- `signedUpCount`

### 主要关联

- 活动可以被多个学员报名
- 活动报名状态会影响通知与课表展示

## 九、订单 Order

### 作用

表示课程购买、会员购买等交易记录。

### 核心字段

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

## 十、会员 Membership

### 作用

表示学员的会员权益状态与可购买套餐。

### 核心字段

- `id`
- `studentId`
- `planName`
- `status`
- `expireAt`
- `benefits`

## 十一、成长记录 GrowthRecord

### 作用

表示学员学习成长相关的综合数据。

### 核心字段

- `studentId`
- `scoreTrend`
- `skillRadar`
- `previousSkillRadar`
- `milestones`
- `teacherSnapshot`
- `assessments`

## 十二、实体关系概览

可以先按下面关系理解：

- `Student` 1 -> N `Enrollment`
- `Course` 1 -> N `Lesson`
- `Course` 1 -> N `Assessment`
- `Student` 1 -> N `Homework`
- `Student` 1 -> N `Notification`
- `Student` N <-> N `Activity`
- `Student` 1 -> N `Order`
- `Student` 1 -> 1 `Membership`
- `Student` 1 -> 1 `GrowthRecord`

## 十三、当前建议

后续正式开发时，至少要优先把下面这些实体先稳定下来：

1. `Student`
2. `Course`
3. `Enrollment`
4. `Lesson`
5. `Assessment`
6. `Notification`
7. `Activity`
8. `Order`

这几类一旦稳定，前端、后台、后端就能围绕同一套业务模型推进。
