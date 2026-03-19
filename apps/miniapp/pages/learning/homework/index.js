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

  submitHomework() {
    setDemoState({
      homeworkSubmitted: true,
    })
    this.refresh()
    wx.showToast({
      title: '作业已提交',
      icon: 'success',
    })
  },

  goProfile() {
    wx.switchTab({ url: '/pages/tab/profile/index' })
  },
}))
