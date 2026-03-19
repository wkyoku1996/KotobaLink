const STORAGE_KEY = 'kotobalink-accessibility-level'

const LEVELS = [
  { label: '紧凑', fontScale: 0.9, pageScale: 0.94 },
  { label: '标准', fontScale: 1, pageScale: 1 },
  { label: '舒适', fontScale: 1.12, pageScale: 1.04 },
  { label: '大字', fontScale: 1.24, pageScale: 1.08 },
  { label: '超大', fontScale: 1.36, pageScale: 1.12 },
]

const DEFAULT_LEVEL = 1

function normalizeLevel(level) {
  const numericLevel = Number(level)

  if (Number.isNaN(numericLevel)) {
    return DEFAULT_LEVEL
  }

  return Math.min(Math.max(numericLevel, 0), LEVELS.length - 1)
}

function getStoredLevel() {
  const level = wx.getStorageSync(STORAGE_KEY)
  return normalizeLevel(level)
}

function setStoredLevel(level) {
  const nextLevel = normalizeLevel(level)
  wx.setStorageSync(STORAGE_KEY, nextLevel)
  return nextLevel
}

function shiftLevel(delta) {
  return setStoredLevel(getStoredLevel() + delta)
}

function getAccessibilitySettings() {
  const level = getStoredLevel()
  const current = LEVELS[level]
  const width = current.pageScale > 1 ? `${(100 / current.pageScale).toFixed(2)}%` : '100%'

  return {
    level,
    label: current.label,
    fontScale: current.fontScale,
    pageScale: current.pageScale,
    fontScalePercent: `${Math.round(current.fontScale * 100)}%`,
    pageScalePercent: `${Math.round(current.pageScale * 100)}%`,
    canDecrease: level > 0,
    canIncrease: level < LEVELS.length - 1,
    pageScaleStyle: `transform: scale(${current.pageScale}); transform-origin: top center; width: ${width}; margin: 0 auto;`,
  }
}

module.exports = {
  getAccessibilitySettings,
  shiftLevel,
}
