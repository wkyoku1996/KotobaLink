const DEFAULT_API_BASE_URL = 'https://aegislinks.site/api/v1'
const LOCAL_API_BASE_URL = DEFAULT_API_BASE_URL
const ONLINE_API_BASE_URL = DEFAULT_API_BASE_URL
const LOCALHOST_API_PATTERNS = ['http://127.0.0.1', 'http://localhost']

function getApiBaseUrlOverride() {
  try {
    if (typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function') {
      const value = wx.getStorageSync('kotobalink_api_base_url')
      if (typeof value === 'string' && value.trim()) {
        return value.trim()
      }
    }
  } catch (error) {
    console.warn('[api-config] failed to read API override from storage', error)
  }

  if (typeof process !== 'undefined' && process && process.env && process.env.KOTOBALINK_API_BASE_URL) {
    return process.env.KOTOBALINK_API_BASE_URL.trim()
  }

  return ''
}

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
  const override = getApiBaseUrlOverride()
  if (override) {
    return override
  }

  const envVersion = getEnvVersion()

  if (envVersion === 'trial' || envVersion === 'release') {
    return ONLINE_API_BASE_URL || LOCAL_API_BASE_URL
  }

  return LOCAL_API_BASE_URL
}

const API_BASE_URL = resolveApiBaseUrl()
const ENABLE_DEMO_FALLBACK = LOCALHOST_API_PATTERNS.some((pattern) => API_BASE_URL.startsWith(pattern))

module.exports = {
  API_BASE_URL,
  DEFAULT_API_BASE_URL,
  ENABLE_DEMO_FALLBACK,
  LOCAL_API_BASE_URL,
  ONLINE_API_BASE_URL,
}
