const { ensureDemoState } = require('./services/demo-service')

App({
  onLaunch() {
    ensureDemoState()
  }
})
