const { DEFAULT_DEMO_STATE, DEMO_STATE_KEY } = require('../config/demo-config')

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function ensureDemoState() {
  const state = wx.getStorageSync(DEMO_STATE_KEY)
  if (!state) {
    wx.setStorageSync(DEMO_STATE_KEY, clone(DEFAULT_DEMO_STATE))
  }
}

function getDemoState() {
  ensureDemoState()
  return {
    ...clone(DEFAULT_DEMO_STATE),
    ...wx.getStorageSync(DEMO_STATE_KEY),
  }
}

function setDemoState(patch) {
  const nextState = {
    ...getDemoState(),
    ...patch,
  }
  wx.setStorageSync(DEMO_STATE_KEY, nextState)
  return nextState
}

function resetDemoState() {
  wx.setStorageSync(DEMO_STATE_KEY, clone(DEFAULT_DEMO_STATE))
}

module.exports = {
  ensureDemoState,
  getDemoState,
  setDemoState,
  resetDemoState,
}
