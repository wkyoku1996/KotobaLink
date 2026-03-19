const { getDemoData } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    demo: {},
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    this.setData({
      demo: getDemoData(),
    })
  },

  goSchedule() {
    wx.navigateTo({
      url: '/pages/learning/schedule/index',
    })
  },
}))
