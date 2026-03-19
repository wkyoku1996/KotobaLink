const { getDemoData, getProfileGrowthData, resetDemoState, getDemoToday } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

function formatDateKey(date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

function buildUpcomingSchedule(schedule) {
  const today = getDemoToday()
  const todayKey = formatDateKey(today)
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  let upcomingCourses = schedule.filter((item) => item.dateKey === todayKey)

  if (upcomingCourses.length === 0) {
    const futureCourses = schedule
      .filter((item) => item.dateKey > todayKey)
      .sort((a, b) => {
        if (a.dateKey === b.dateKey) {
          return a.startTime.localeCompare(b.startTime)
        }
        return a.dateKey.localeCompare(b.dateKey)
      })

    if (futureCourses.length > 0) {
      upcomingCourses = [futureCourses[0]]
    }
  }

  let dateLabel = '暂无课程安排'
  if (upcomingCourses.length > 0) {
    const courseDate = new Date(upcomingCourses[0].dateKey.replace(/-/g, '/'))
    dateLabel = `${courseDate.getMonth() + 1}/${courseDate.getDate()} ${weekdays[courseDate.getDay()]}`
  }

  return {
    dateLabel,
    courses: upcomingCourses.sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }
}

function buildRadarComparison(current, previous) {
  return current.map((item, index) => {
    const previousScore = previous[index] ? previous[index].score : 0
    const delta = item.score - previousScore
    return {
      ...item,
      scoreText: `${item.score}`,
      previousScore,
      deltaText: delta >= 0 ? `+${delta}` : `${delta}`,
    }
  })
}

function getRadarPoint(index, total, radius, center) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  }
}

function drawPolygon(ctx, items, total, center, radius, fillColor, strokeColor, lineWidth, scoreKey, dotColor, dotRadius) {
  ctx.beginPath()
  items.forEach((item, index) => {
    const point = getRadarPoint(index, total, radius * (item[scoreKey] / 100), center)
    if (index === 0) {
      ctx.moveTo(point.x, point.y)
    } else {
      ctx.lineTo(point.x, point.y)
    }
  })
  ctx.closePath()
  ctx.setFillStyle(fillColor)
  ctx.fill()
  ctx.setStrokeStyle(strokeColor)
  ctx.setLineWidth(lineWidth)
  ctx.stroke()

  items.forEach((item, index) => {
    const point = getRadarPoint(index, total, radius * (item[scoreKey] / 100), center)
    ctx.beginPath()
    ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2)
    ctx.setFillStyle(dotColor)
    ctx.fill()
  })
}

function drawRadarToCanvas(ctx, items, size) {
  const center = size / 2
  const radius = size * 0.34
  const dotRadius = Math.max(4, size * 0.012)
  const total = items.length

  ctx.clearRect(0, 0, size, size)

  for (let level = 1; level <= 4; level += 1) {
    const ringRadius = (radius / 4) * level
    ctx.beginPath()
    items.forEach((_, index) => {
      const point = getRadarPoint(index, total, ringRadius, center)
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.closePath()
    ctx.setStrokeStyle('rgba(108, 87, 63, 0.14)')
    ctx.setLineWidth(1)
    ctx.stroke()
  }

  items.forEach((_, index) => {
    const edgePoint = getRadarPoint(index, total, radius, center)
    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.lineTo(edgePoint.x, edgePoint.y)
    ctx.setStrokeStyle('rgba(108, 87, 63, 0.16)')
    ctx.setLineWidth(1)
    ctx.stroke()
  })

  drawPolygon(ctx, items, total, center, radius, 'rgba(206, 122, 42, 0.12)', '#ce7a2a', 2, 'previousScore', '#ce7a2a', dotRadius)
  drawPolygon(ctx, items, total, center, radius, 'rgba(31, 106, 98, 0.18)', '#1f6a62', 3, 'score', '#1f6a62', dotRadius)
  ctx.draw()
}

Page(withAccessibility({
  data: {
    demo: {},
    growth: null,
    upcomingSchedule: null,
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const demo = getDemoData()
    const growth = getProfileGrowthData()
    this.setData({
      demo,
      growth: {
        ...growth,
        skillRadar: buildRadarComparison(growth.skillRadar, growth.previousSkillRadar),
      },
      upcomingSchedule: buildUpcomingSchedule(demo.schedule),
    })
    setTimeout(() => {
      this.drawSkillRadar()
    }, 0)
  },

  goSchedule() {
    wx.navigateTo({
      url: '/pages/learning/schedule/index',
    })
  },

  goActivity() {
    wx.navigateTo({
      url: '/pages/engagement/activity/index',
    })
  },

  goTask() {
    wx.switchTab({
      url: '/pages/tab/task/index',
    })
  },

  resetDemo() {
    resetDemoState()
    this.refresh()
    wx.showToast({
      title: '演示状态已重置',
      icon: 'none',
    })
  },

  drawSkillRadar() {
    const { growth } = this.data
    if (!growth || !growth.skillRadar || !growth.skillRadar.length) {
      return
    }

    const items = growth.skillRadar
    const query = this.createSelectorQuery()
    query.select('#homeSkillRadar').boundingClientRect()
    query.exec((result) => {
      const rect = result && result[0]
      const size = rect ? Math.floor(Math.min(rect.width, rect.height)) : 420
      const ctx = wx.createCanvasContext('homeSkillRadar')
      drawRadarToCanvas(ctx, items, size || 420)
    })
  },
}))
