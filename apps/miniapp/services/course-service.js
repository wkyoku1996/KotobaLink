const { request } = require('./api-service')
const {
  getDemoData,
  getCourseById,
  getCatalogCourseDetail,
  getEnrolledCourseDetail,
  getLessonDetail,
  getAssessmentDetail,
} = require('./demo-service')

async function getPublishedCourses() {
  try {
    return await request('/mini/courses')
  } catch (error) {
    console.warn('[course-service] fallback to demo purchasable courses', error)
    const demo = getDemoData()
    return demo.courses.filter((item) => !item.isEnrolled)
  }
}

async function getPublishedCourseBundle(id) {
  try {
    return await request(`/mini/courses/${id}`)
  } catch (error) {
    console.warn('[course-service] fallback to demo course detail', error)
    return {
      course: getCourseById(id),
      detail: getCatalogCourseDetail(id),
    }
  }
}

async function getMyPublishedCourses() {
  try {
    return await request('/mini/me/courses')
  } catch (error) {
    console.warn('[course-service] fallback to demo enrolled courses', error)
    const demo = getDemoData()
    return demo.learningArchive.enrolledCourses
  }
}

async function getMyPublishedCourseBundle(id) {
  try {
    return await request(`/mini/me/courses/${id}`)
  } catch (error) {
    console.warn('[course-service] fallback to demo enrolled course detail', error)
    return {
      detail: getEnrolledCourseDetail(id),
      enrollment: null,
    }
  }
}

async function getPublishedLessonDetail(courseId, lessonId) {
  try {
    return await request(`/mini/courses/${courseId}/lessons/${lessonId}`)
  } catch (error) {
    console.warn('[course-service] fallback to demo catalog lesson detail', error)
    return getLessonDetail(courseId, lessonId)
  }
}

async function getMyPublishedLessonDetail(courseId, lessonId) {
  try {
    return await request(`/mini/me/courses/${courseId}/lessons/${lessonId}`)
  } catch (error) {
    console.warn('[course-service] fallback to demo enrolled lesson detail', error)
    return getLessonDetail(courseId, lessonId)
  }
}

async function getPublishedAssessmentDetail(courseId, assessmentId) {
  try {
    return await request(`/mini/courses/${courseId}/assessments/${assessmentId}`)
  } catch (error) {
    console.warn('[course-service] fallback to demo catalog assessment detail', error)
    return getAssessmentDetail(courseId, assessmentId)
  }
}

async function getMyPublishedAssessmentDetail(courseId, assessmentId) {
  try {
    return await request(`/mini/me/courses/${courseId}/assessments/${assessmentId}`)
  } catch (error) {
    console.warn('[course-service] fallback to demo enrolled assessment detail', error)
    return getAssessmentDetail(courseId, assessmentId)
  }
}

module.exports = {
  getPublishedCourses,
  getPublishedCourseBundle,
  getMyPublishedCourses,
  getMyPublishedCourseBundle,
  getPublishedLessonDetail,
  getMyPublishedLessonDetail,
  getPublishedAssessmentDetail,
  getMyPublishedAssessmentDetail,
}
