const LOCAL_API_BASE_URL = 'http://127.0.0.1:8000/api/v1'
const ONLINE_API_BASE_URL = ''

function getEnvVersion() {
  try {
    if (typeof wx !== 'undefined' && typeof wx.getAccountInfoSync === 'function') {
      return wx.getAccountInfoSync().miniProgram.envVersion || 'develop'
    }
  } catch (error) {
    console.warn('[api-config] failed to read mini program envVersion', error)
  }

  return 'develop'
}

function resolveApiBaseUrl() {
  const envVersion = getEnvVersion()

  if (envVersion === 'trial' || envVersion === 'release') {
    return ONLINE_API_BASE_URL || LOCAL_API_BASE_URL
  }

  return LOCAL_API_BASE_URL
}

const API_BASE_URL = resolveApiBaseUrl()

module.exports = {
  API_BASE_URL,
  LOCAL_API_BASE_URL,
  ONLINE_API_BASE_URL,
}
