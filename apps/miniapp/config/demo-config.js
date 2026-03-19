const DEMO_ANCHOR_DATE_KEY = '2026-03-18'

const DEFAULT_DEMO_STATE = {
  purchased: false,
  purchasedCourseIds: [],
  lastPurchasedCourseId: null,
  homeworkSubmitted: false,
  dailyTaskCompleted: false,
  learnedVocabIds: [],
  readNotificationIds: [2, 6],
  activitySignedUp: false,
}

const DEMO_STATE_KEY = 'kotobalink-demo-state'

module.exports = {
  DEMO_ANCHOR_DATE_KEY,
  DEFAULT_DEMO_STATE,
  DEMO_STATE_KEY,
}
