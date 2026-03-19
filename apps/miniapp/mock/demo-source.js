const { DEMO_ANCHOR_DATE_KEY } = require('../config/demo-config')
const { BASE_DATA } = require('./base-data')
const { TEACHER_PROFILES } = require('./teacher-profiles')
const { LESSON_RESOURCES } = require('./lesson-resources')
const { COURSE_ASSESSMENTS } = require('./course-assessments')

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function parseDateKey(dateKey) {
  return new Date(`${dateKey}T00:00:00`)
}

function formatDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getScheduleRange() {
  const keys = BASE_DATA.schedule.map((item) => item.dateKey).sort()
  return {
    min: keys[0],
    max: keys[keys.length - 1],
  }
}

function getDemoToday() {
  const actualToday = new Date()
  const actualKey = formatDateKey(actualToday)
  const range = getScheduleRange()

  if (actualKey < range.min || actualKey > range.max) {
    return parseDateKey(DEMO_ANCHOR_DATE_KEY)
  }

  return parseDateKey(actualKey)
}

function buildPurchasedEnrollment(course) {
  const lessonCatalog = course.lessonCatalog || []
  const isOneOnOne = course.classType.includes('1 对 1')

  return {
    id: course.id,
    courseName: course.name,
    className: isOneOnOne ? '个人预约' : `${course.name}新开班`,
    teacher: course.teacher,
    classroom: course.classroom,
    serviceStatus: '已开通',
    lessonProgress: {
      completed: 0,
      total: lessonCatalog.length || 3,
      pendingMakeups: 0,
    },
    classInfo: `已购课，当前按 ${course.classSchedule} 安排课程服务。`,
    teachingContent: lessonCatalog.length
      ? lessonCatalog.map((item) => item.title)
      : [course.summary, '按课程进度逐步开放 lesson 与作业'],
    teacherFeedbacks: [],
    leaveRecords: [],
    homeworkRecords: [],
  }
}

function buildActivityNotification(activitySignedUp) {
  if (activitySignedUp) {
    return {
      id: 6,
      title: '活动提醒：春季日语交流沙龙已报名成功',
      type: '活动提醒',
      category: 'activity',
      time: '2026-03-15 20:00',
      sender: '活动中心',
      summary: '活动时间为 2026-03-20 14:00，地点在东京池袋交流空间，请提前 15 分钟到场签到。',
      tags: ['活动', '已报名'],
      important: false,
    }
  }

  return {
    id: 6,
    title: '活动提醒：春季日语交流沙龙开放报名中',
    type: '活动提醒',
    category: 'activity',
    time: '2026-03-15 20:00',
    sender: '活动中心',
    summary: '活动时间为 2026-03-20 14:00，地点在东京池袋交流空间，可在活动页完成报名。',
    tags: ['活动', '待报名'],
    important: false,
  }
}

function buildPaymentOrder(data, state) {
  const courseId = state.lastPurchasedCourseId
  if (!courseId) {
    return null
  }

  const course = data.courses.find((item) => String(item.id) === String(courseId))
  if (!course) {
    return null
  }

  const enrollment = data.learningArchive.enrolledCourses.find((item) => String(item.id) === String(courseId))

  return {
    courseName: course.name,
    className: enrollment ? enrollment.className : course.classType,
    teacher: course.teacher,
    price: course.price,
    benefit: course.benefit,
    serviceStatus: enrollment ? enrollment.serviceStatus : '已开通',
  }
}

function buildDemoData(state) {
  const data = clone(BASE_DATA)
  const purchasedCourseIds = state.purchasedCourseIds || []
  const purchasedEnrollments = data.courses
    .filter((course) => purchasedCourseIds.includes(course.id))
    .filter((course) => !data.learningArchive.enrolledCourses.some((item) => item.id === course.id))
    .map(buildPurchasedEnrollment)

  data.state = state
  data.learningArchive.enrolledCourses = [
    ...data.learningArchive.enrolledCourses,
    ...purchasedEnrollments,
  ]
  data.schedule = data.schedule.map((item) => ({
    ...item,
    date: `${item.dateKey.slice(5).replace('-', '/')} ${item.startTime}`,
  }))
  data.courses = data.courses.map((item) => ({
    ...item,
    isPurchased: purchasedCourseIds.includes(item.id),
    isEnrolled: data.learningArchive.enrolledCourses.some((course) => course.id === item.id),
  }))
  data.activity.status = state.activitySignedUp ? '已报名' : '可报名'
  data.dailyTask.currentStreak = state.dailyTaskCompleted
    ? data.dailyTask.streak + 1
    : data.dailyTask.streak
  data.dailyTask.learnedCount = state.learnedVocabIds.length
  data.dailyTask.allLearned = data.dailyTask.learnedCount >= data.dailyTask.vocab.length
  data.dailyTask.vocab = data.dailyTask.vocab.map((item) => ({
    ...item,
    learned: state.learnedVocabIds.includes(item.id),
  }))
  data.dailyTask.buttonText = state.dailyTaskCompleted
    ? '今日已完成打卡'
    : data.dailyTask.allLearned
      ? '完成今日打卡'
      : '请先学完 5 个词汇'
  data.homework.buttonText = state.homeworkSubmitted
    ? '已提交作业'
    : '提交语音作业'
  data.notifications = data.notifications.map((item) => ({
    ...item,
    read: state.readNotificationIds.includes(item.id),
  }))
  data.notifications = data.notifications.map((item) => (
    item.id === 6
      ? {
        ...buildActivityNotification(state.activitySignedUp),
        read: state.readNotificationIds.includes(item.id),
      }
      : item
  ))
  data.paymentOrder = buildPaymentOrder(data, state)
  return data
}

function toNumericScore(value) {
  if (typeof value === 'number') {
    return value
  }

  const gradeMap = {
    'A+': 98,
    A: 95,
    'A-': 91,
    'B+': 88,
    B: 84,
    'B-': 80,
    'C+': 76,
    C: 72,
  }

  if (gradeMap[value] !== undefined) {
    return gradeMap[value]
  }

  const parsed = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isNaN(parsed) ? 0 : parsed
}

function getCourseById(data, id) {
  return data.courses.find((item) => String(item.id) === String(id)) || data.featuredCourse
}

function getLessonResources(title, fallbackOutline) {
  const resources = LESSON_RESOURCES[title]
  if (resources) {
    return resources
  }

  return {
    outline: fallbackOutline && fallbackOutline.length
      ? fallbackOutline
      : ['课堂导入与目标说明', '重点内容讲解与练习', '课后复盘与作业说明'],
    vocab: ['重点词汇 1', '重点词汇 2', '重点词汇 3'],
    grammar: ['重点语法 1', '重点语法 2', '重点语法 3'],
  }
}

function getLessonPractice(title) {
  const resources = LESSON_RESOURCES[title]
  if (resources && resources.practice) {
    return resources.practice
  }

  return {
    quizTitle: '课堂练习',
    examTitle: '随堂检测',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: '请选择本节课核心表达中更合适的一项。',
        options: ['表达 A', '表达 B', '表达 C'],
        answer: '这些都不对',
        correctAnswer: '表达 A',
      },
      {
        id: 'q2',
        type: 'blank',
        prompt: '请补全本节课重点句型。',
        placeholder: '请输入答案',
        answer: '示例答案',
      },
    ],
  }
}

function getCourseAssessments(courseId) {
  return clone(COURSE_ASSESSMENTS[courseId] || [])
}

function formatLessonDate(dateKey, startTime) {
  return `${dateKey.slice(5).replace('-', '/')} ${startTime}`
}

function mapScheduleLesson(item) {
  const resources = getLessonResources(item.title, item.outline)
  return {
    id: item.id,
    title: item.title,
    dateKey: item.dateKey,
    date: item.date || formatLessonDate(item.dateKey, item.startTime),
    startTime: item.startTime,
    endTime: item.endTime,
    status: item.status,
    summary: item.homeworkTitle,
    className: item.className,
    teacher: item.teacher,
    classroom: item.classroom,
    outline: resources.outline,
    vocab: resources.vocab,
    grammar: resources.grammar,
  }
}

function sortLessons(lessons) {
  return lessons.sort((left, right) => {
    const leftKey = `${left.dateKey} ${left.startTime}`
    const rightKey = `${right.dateKey} ${right.startTime}`
    return leftKey.localeCompare(rightKey)
  })
}

function getTeacherProfile(name) {
  return TEACHER_PROFILES[name] || {
    name,
    title: '授课老师',
    specialty: '课程教学',
    intro: '负责课程讲授与学习辅导。',
  }
}

function getCourseLessons(data, course) {
  const scheduleLessons = sortLessons(
    data.schedule
      .filter((item) => String(item.courseId) === String(course.id))
      .map(mapScheduleLesson)
  )

  if (scheduleLessons.length) {
    return scheduleLessons
  }

  return sortLessons(
    (course.lessonCatalog || []).map((item) => ({
      ...item,
      date: formatLessonDate(item.dateKey, item.startTime),
      className: course.classType,
      teacher: course.teacher,
      classroom: course.classroom,
      outline: getLessonResources(item.title, item.outline).outline,
      vocab: getLessonResources(item.title, item.outline).vocab,
      grammar: getLessonResources(item.title, item.outline).grammar,
    }))
  )
}

function getCatalogCourseDetail(data, id) {
  const course = data.courses.find((item) => String(item.id) === String(id))

  if (!course) {
    return null
  }

  const lessons = getCourseLessons(data, course)
  const teacher = getTeacherProfile(course.teacher)

  return {
    title: course.name,
    courseInfo: [
      { label: '课程类型', value: course.type },
      { label: '课程周期', value: course.duration },
      { label: '课程价格', value: course.price },
      { label: '课程说明', value: course.summary },
    ],
    classInfo: [
      { label: '班型安排', value: course.classType },
      { label: '上课时间', value: course.classSchedule },
      { label: '上课教室', value: course.classroom },
      { label: '当前状态', value: course.status },
    ],
    teacherInfo: [
      { label: '教师姓名', value: teacher.name },
      { label: '教师身份', value: teacher.title },
      { label: '擅长方向', value: teacher.specialty },
      { label: '教师介绍', value: teacher.intro },
    ],
    lessons,
    assessmentOverview: [
      { label: '考核方式', value: '按单元测试、阶段测评和口语复盘综合评估' },
      { label: '当前安排', value: `${Math.max(1, Math.ceil(lessons.length / 3))} 次阶段考核，随课程进度逐步开放` },
    ],
  }
}

function getEnrolledCourseDetail(data, id) {
  const enrolledCourse = data.learningArchive.enrolledCourses.find((item) => String(item.id) === String(id))

  if (!enrolledCourse) {
    return null
  }

  const baseCourse = data.courses.find((item) => String(item.id) === String(id)) || {}
  const teacher = getTeacherProfile(enrolledCourse.teacher)
  const lessons = getCourseLessons(data, {
    ...baseCourse,
    id: enrolledCourse.id,
    teacher: enrolledCourse.teacher,
    classroom: enrolledCourse.classroom,
  })

  return {
    title: enrolledCourse.courseName,
    courseInfo: [
      { label: '课程类型', value: baseCourse.type || '已报名课程' },
      { label: '服务状态', value: enrolledCourse.serviceStatus },
      { label: '课时进度', value: `${enrolledCourse.lessonProgress.completed} / ${enrolledCourse.lessonProgress.total}` },
      { label: '课程说明', value: enrolledCourse.classInfo },
    ],
    classInfo: [
      { label: '班级名称', value: enrolledCourse.className },
      { label: '上课教室', value: enrolledCourse.classroom },
      { label: '任课老师', value: enrolledCourse.teacher },
      { label: '待补课时', value: `${enrolledCourse.lessonProgress.pendingMakeups} 节` },
    ],
    teacherInfo: [
      { label: '教师姓名', value: teacher.name },
      { label: '教师身份', value: teacher.title },
      { label: '擅长方向', value: teacher.specialty },
      { label: '教师介绍', value: teacher.intro },
    ],
    lessons,
    assessments: getCourseAssessments(enrolledCourse.id),
  }
}

function getCourseStudyInfo(data, id) {
  const todayKey = formatDateKey(getDemoToday())
  const scheduleItems = data.schedule
    .filter((item) => String(item.courseId) === String(id))
    .sort((left, right) => {
      const leftKey = `${left.dateKey} ${left.startTime}`
      const rightKey = `${right.dateKey} ${right.startTime}`
      return leftKey.localeCompare(rightKey)
    })

  if (!scheduleItems.length) {
    return null
  }

  const classNames = [...new Set(scheduleItems.map((item) => item.className))]
  const teachers = [...new Set(scheduleItems.map((item) => item.teacher))]
  const nextLesson = scheduleItems.find((item) => item.dateKey >= todayKey) || scheduleItems[0]

  return {
    classNames,
    teachers,
    lessonCount: scheduleItems.length,
    nextLesson: {
      title: nextLesson.title,
      date: nextLesson.date,
      status: nextLesson.status,
    },
  }
}

function getScheduleLessonById(data, id) {
  return data.schedule.find((item) => String(item.id) === String(id)) || null
}

function getLessonDetail(data, courseId, lessonId) {
  const course = data.courses.find((item) => String(item.id) === String(courseId))
  const enrolledCourse = data.learningArchive.enrolledCourses.find((item) => String(item.id) === String(courseId))

  if (!course && !enrolledCourse) {
    return null
  }

  const lessons = getCourseLessons(data, {
    ...(course || {}),
    ...(enrolledCourse ? { teacher: enrolledCourse.teacher, classroom: enrolledCourse.classroom } : {}),
    id: courseId,
  })
  const lesson = lessons.find((item) => String(item.id) === String(lessonId))

  if (!lesson) {
    return null
  }

  return {
    title: lesson.title,
    courseName: enrolledCourse ? enrolledCourse.courseName : course.name,
    className: enrolledCourse ? enrolledCourse.className : course.classType,
    teacher: lesson.teacher,
    classroom: lesson.classroom,
    date: lesson.date,
    endTime: lesson.endTime,
    status: lesson.status,
    outline: lesson.outline,
    vocab: lesson.vocab,
    grammar: lesson.grammar,
    practice: enrolledCourse ? getLessonPractice(lesson.title) : null,
    isEnrolledLesson: !!enrolledCourse,
  }
}

function getAssessmentDetail(data, courseId, assessmentId) {
  const enrolledCourse = data.learningArchive.enrolledCourses.find((item) => String(item.id) === String(courseId))
  const assessments = getCourseAssessments(Number(courseId))
  const assessment = assessments.find((item) => String(item.id) === String(assessmentId))

  if (!assessment || !enrolledCourse) {
    return null
  }

  return {
    ...assessment,
    courseName: enrolledCourse.courseName,
    className: enrolledCourse.className,
    teacher: enrolledCourse.teacher,
  }
}

function getProfileGrowthData(data) {
  const journey = data.learningArchive.growthJourney
  const allHomework = data.learningArchive.enrolledCourses.flatMap((course) => course.homeworkRecords || [])
  const allFeedbacks = data.learningArchive.enrolledCourses.flatMap((course) => course.teacherFeedbacks || [])
  const allLeaveRecords = data.learningArchive.enrolledCourses.flatMap((course) => course.leaveRecords || [])
  const averageHomeworkScore = Math.round(
    allHomework.reduce((sum, item) => sum + toNumericScore(item.score), 0) / (allHomework.length || 1)
  )
  const latestTrend = journey.scoreTrend[journey.scoreTrend.length - 1]
  const startTrend = journey.scoreTrend[0]

  return {
    summaryCards: [
      {
        label: '综合成长指数',
        value: `${Math.round((latestTrend.lessonScore + latestTrend.homeworkScore + latestTrend.quizScore) / 3)}`,
        desc: `较入学提升 ${Math.round(((latestTrend.lessonScore + latestTrend.homeworkScore + latestTrend.quizScore) - (startTrend.lessonScore + startTrend.homeworkScore + startTrend.quizScore)) / 3)} 分`,
      },
      {
        label: '作业平均分',
        value: `${averageHomeworkScore}`,
        desc: `累计 ${allHomework.length} 次作业记录`,
      },
      {
        label: '教师反馈次数',
        value: `${allFeedbacks.length}`,
        desc: `最近一次反馈来自 ${allFeedbacks[allFeedbacks.length - 1].lesson}`,
      },
      {
        label: '阶段测评节点',
        value: `${journey.assessments.length}`,
        desc: `请假/调课记录 ${allLeaveRecords.length} 次`,
      },
    ],
    scoreTrend: journey.scoreTrend,
    skillRadar: journey.skillRadar,
    previousSkillRadar: journey.previousSkillRadar,
    assessments: journey.assessments,
    milestones: journey.milestones,
    teacherSnapshot: journey.teacherSnapshot,
  }
}

function getMessagesData(data) {
  const typeMap = {
    all: '全部',
    system: '系统消息',
    teacher: '教师消息',
    task: '任务提醒',
    activity: '活动提醒',
  }

  const messages = [...data.notifications].sort((left, right) => {
    if (left.important !== right.important) {
      return left.important ? -1 : 1
    }

    if (left.read !== right.read) {
      return left.read ? 1 : -1
    }

    return right.time.localeCompare(left.time)
  })

  return {
    filters: Object.keys(typeMap).map((key) => ({
      key,
      label: typeMap[key],
      count: key === 'all'
        ? messages.length
        : messages.filter((item) => item.category === key).length,
    })),
    unreadCount: messages.filter((item) => !item.read).length,
    importantCount: messages.filter((item) => item.important).length,
    messages,
  }
}

module.exports = {
  buildDemoData,
  getDemoToday,
  getCourseById,
  getCatalogCourseDetail,
  getEnrolledCourseDetail,
  getCourseStudyInfo,
  getAssessmentDetail,
  getLessonDetail,
  getMessagesData,
  getProfileGrowthData,
  getScheduleLessonById,
}
