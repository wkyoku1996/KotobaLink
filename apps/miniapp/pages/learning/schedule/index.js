const { getDemoData, getDemoToday } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

const WEEKDAY_LABELS = ['一', '二', '三', '四', '五', '六', '日']

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getWeekStart(date) {
  const nextDate = new Date(date)
  const day = nextDate.getDay()
  const offset = day === 0 ? -6 : 1 - day
  nextDate.setDate(nextDate.getDate() + offset)
  return nextDate
}

function buildActivitySchedule(activity) {
  if (activity.status !== '已报名') {
    return null
  }

  return {
    id: 'activity-signup',
    dateKey: '2026-03-20',
    startTime: '14:00',
    endTime: '16:00',
    title: activity.title,
    courseName: '公开活动',
    className: '活动报名',
    status: activity.status,
    isActivity: true,
  }
}

function buildWeekView(schedule, activity) {
  const today = getDemoToday()
  const weekStart = getWeekStart(today)
  const todayKey = formatDateKey(today)
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + index)
    const dateKey = formatDateKey(date)

    return {
      id: dateKey,
      dateKey,
      weekLabel: WEEKDAY_LABELS[index],
      dateLabel: `${date.getMonth() + 1}/${date.getDate()}`,
      isToday: dateKey === todayKey,
    }
  })

  const scheduleItems = [...schedule]
  const activityItem = buildActivitySchedule(activity)

  if (activityItem) {
    scheduleItems.push(activityItem)
  }

  const weekSchedule = scheduleItems.filter((item) => days.some((day) => day.dateKey === item.dateKey))
  const rows = days.map((day) => ({
    ...day,
    courses: weekSchedule
      .filter((item) => item.dateKey === day.dateKey)
      .sort((left, right) => {
        const leftKey = `${left.startTime}-${left.endTime}`
        const rightKey = `${right.startTime}-${right.endTime}`
        return leftKey.localeCompare(rightKey)
      })
      .map((item) => ({
        id: item.id,
        lessonId: item.id,
        courseId: item.courseId,
        title: item.title,
        courseName: item.courseName,
        classBrief: item.className.replace('2026 ', '').replace('个人预约', '1v1'),
        status: item.status,
        startTime: item.startTime,
        endTime: item.endTime,
        isActivity: !!item.isActivity,
      })),
  }))

  return {
    rows,
    rangeLabel: `${days[0].dateLabel} - ${days[6].dateLabel}`,
    courseCount: new Set(weekSchedule.map((item) => `${item.courseName}-${item.className}`)).size,
    totalCount: weekSchedule.length,
  }
}

Page(withAccessibility({
  data: {
    demo: {},
    weekView: {
      rows: [],
      rangeLabel: '',
      courseCount: 0,
      totalCount: 0,
    },
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const demo = getDemoData()
    this.setData({
      demo,
      weekView: buildWeekView(demo.schedule, demo.activity),
    })
  },

  openScheduleItem(event) {
    const { courseId, isActivity, lessonId } = event.currentTarget.dataset

    if (isActivity) {
      wx.navigateTo({
        url: '/pages/engagement/activity/index',
      })
      return
    }

    wx.navigateTo({
      url: `/pages/learning/lesson-detail/index?courseId=${courseId}&lessonId=${lessonId}`,
    })
  },

  goHomework() {
    wx.navigateTo({
      url: '/pages/learning/homework/index',
    })
  },
}))
