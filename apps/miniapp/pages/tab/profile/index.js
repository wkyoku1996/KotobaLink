const { getDemoData, getProfileGrowthData } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

function buildTrendBars(scoreTrend) {
  const maxScore = 100

  return scoreTrend.map((item) => ({
    ...item,
    lessonHeight: `${Math.max(16, item.lessonScore / maxScore * 180)}rpx`,
    homeworkHeight: `${Math.max(16, item.homeworkScore / maxScore * 180)}rpx`,
    quizHeight: `${Math.max(16, item.quizScore / maxScore * 180)}rpx`,
  }))
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

Page(withAccessibility({
  data: {
    demo: {},
    growth: null,
  },

  onShow() {
    const growth = getProfileGrowthData()
    this.setData({
      demo: getDemoData(),
      growth: {
        ...growth,
        scoreTrend: buildTrendBars(growth.scoreTrend),
        skillRadar: buildRadarComparison(growth.skillRadar, growth.previousSkillRadar),
      },
    })
    setTimeout(() => {
      this.drawSkillRadar()
    }, 0)
  },

  goMembership() {
    wx.navigateTo({
      url: '/pages/account/membership/index',
    })
  },

  drawSkillRadar() {
    const { growth } = this.data
    if (!growth || !growth.skillRadar || !growth.skillRadar.length) {
      return
    }

    const query = this.createSelectorQuery()
    query.select('#skillRadar').boundingClientRect()
    query.exec((result) => {
      const rect = result && result[0]
      if (!rect) {
        return
      }

      const size = Math.floor(Math.min(rect.width, rect.height))
      const center = size / 2
      const radius = size * 0.34
      const dotRadius = Math.max(4, size * 0.012)
      const items = growth.skillRadar
      const total = items.length
      const ctx = wx.createCanvasContext('skillRadar')

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
    })
  },
}))
