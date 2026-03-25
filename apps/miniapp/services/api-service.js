const { API_BASE_URL } = require('../config/api')

console.info('[api-service] using API base URL:', API_BASE_URL)

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}${path}`,
      method: options.method || 'GET',
      data: options.data,
      timeout: options.timeout || 8000,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300 && res.data && res.data.success !== false) {
          resolve(res.data.data)
          return
        }

        reject(new Error(res.data && res.data.detail ? res.data.detail : `HTTP ${res.statusCode}`))
      },
      fail(error) {
        reject(error)
      },
    })
  })
}

module.exports = {
  request,
}
