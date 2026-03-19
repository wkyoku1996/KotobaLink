const demoSource = require('../mock/demo-source')
const {
  ensureDemoState,
  getDemoState,
  setDemoState,
  resetDemoState,
} = require('../store/demo-state')

function getDemoData() {
  return demoSource.buildDemoData(getDemoState())
}

function getCourseById(id) {
  return demoSource.getCourseById(getDemoData(), id)
}

function getCatalogCourseDetail(id) {
  return demoSource.getCatalogCourseDetail(getDemoData(), id)
}

function getEnrolledCourseDetail(id) {
  return demoSource.getEnrolledCourseDetail(getDemoData(), id)
}

function getCourseStudyInfo(id) {
  return demoSource.getCourseStudyInfo(getDemoData(), id)
}

function getAssessmentDetail(courseId, assessmentId) {
  return demoSource.getAssessmentDetail(getDemoData(), courseId, assessmentId)
}

function getLessonDetail(courseId, lessonId) {
  return demoSource.getLessonDetail(getDemoData(), courseId, lessonId)
}

function getMessagesData() {
  return demoSource.getMessagesData(getDemoData())
}

function getProfileGrowthData() {
  return demoSource.getProfileGrowthData(getDemoData())
}

function getScheduleLessonById(id) {
  return demoSource.getScheduleLessonById(getDemoData(), id)
}

module.exports = {
  getDemoData,
  getDemoToday: demoSource.getDemoToday,
  getCourseById,
  getCatalogCourseDetail,
  getEnrolledCourseDetail,
  getCourseStudyInfo,
  getAssessmentDetail,
  getLessonDetail,
  getMessagesData,
  getProfileGrowthData,
  getScheduleLessonById,
  getDemoState,
  setDemoState,
  resetDemoState,
  ensureDemoState,
}
