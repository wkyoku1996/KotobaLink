const { getDemoData } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    demo: {},
  },

  onShow() {
    this.setData({
      demo: getDemoData(),
    })
  },
}))
