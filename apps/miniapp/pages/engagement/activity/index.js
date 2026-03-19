const { getDemoData, setDemoState } = require('../../../services/demo-service')
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

  toggleSignup() {
    const signedUp = this.data.demo.activity.status === '已报名'
    setDemoState({
      activitySignedUp: !signedUp,
    })
    this.refresh()
    wx.showToast({
      title: signedUp ? '已取消报名' : '报名成功',
      icon: 'success',
    })
  },

  goSchedule() {
    wx.navigateTo({
      url: '/pages/learning/schedule/index',
    })
  },
}))
