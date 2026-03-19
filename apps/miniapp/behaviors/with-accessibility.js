const { getAccessibilitySettings, shiftLevel } = require('../store/accessibility-store')

function withAccessibility(config) {
  const originalData = config.data || {}
  const originalOnLoad = config.onLoad
  const originalOnShow = config.onShow

  return {
    ...config,
    data: {
      accessibility: getAccessibilitySettings(),
      ...originalData,
    },

    onLoad(...args) {
      if (typeof originalOnLoad === 'function') {
        originalOnLoad.apply(this, args)
      }
      this.refreshAccessibility()
    },

    onShow(...args) {
      if (typeof originalOnShow === 'function') {
        originalOnShow.apply(this, args)
      }
      this.refreshAccessibility()
    },

    refreshAccessibility() {
      this.setData({
        accessibility: getAccessibilitySettings(),
      })
    },

    decreaseAccessibility() {
      shiftLevel(-1)
      this.refreshAccessibility()
    },

    increaseAccessibility() {
      shiftLevel(1)
      this.refreshAccessibility()
    },
  }
}

module.exports = {
  withAccessibility,
}
