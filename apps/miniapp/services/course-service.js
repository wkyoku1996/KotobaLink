const { ENABLE_DEMO_FALLBACK } = require('../config/api')
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
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getPublishedCourses failed without demo fallback', error)
      return []
    }

    console.warn('[course-service] fallback to demo purchasable courses', error)
    const demo = getDemoData()
    return demo.courses.filter((item) => !item.isEnrolled)
  }
}

async function getPublishedCourseBundle(id) {
  try {
    return await request(`/mini/courses/${id}`)
  } catch (error) {
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getPublishedCourseBundle failed without demo fallback', error)
      return null
    }

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
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getMyPublishedCourses failed without demo fallback', error)
      return []
    }

    console.warn('[course-service] fallback to demo enrolled courses', error)
    const demo = getDemoData()
    return demo.learningArchive.enrolledCourses
  }
}

async function getMyCourseSummary() {
  try {
    return await request('/mini/me/course-summary')
  } catch (error) {
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getMyCourseSummary failed without demo fallback', error)
      return {
        lessonCompleted: 0,
        lessonTotal: 0,
        level: '',
        homeworkCompleted: null,
        homeworkTotal: null,
        pendingMakeups: null,
      }
    }

    console.warn('[course-service] fallback to demo course summary', error)
    const demo = getDemoData()
    return {
      lessonCompleted: demo.learningArchive.summary.lessonCompleted,
      lessonTotal: demo.learningArchive.summary.lessonTotal,
      level: demo.student.level,
      homeworkCompleted: demo.learningArchive.summary.homeworkCompleted,
      homeworkTotal: demo.learningArchive.summary.homeworkTotal,
      pendingMakeups: demo.learningArchive.summary.pendingMakeups,
    }
  }
}

async function getMyPublishedCourseBundle(id) {
  try {
    return await request(`/mini/me/courses/${id}`)
  } catch (error) {
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getMyPublishedCourseBundle failed without demo fallback', error)
      return null
    }

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
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getPublishedLessonDetail failed without demo fallback', error)
      return null
    }

    console.warn('[course-service] fallback to demo catalog lesson detail', error)
    return getLessonDetail(courseId, lessonId)
  }
}

async function getMyPublishedLessonDetail(courseId, lessonId) {
  try {
    return await request(`/mini/me/courses/${courseId}/lessons/${lessonId}`)
  } catch (error) {
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getMyPublishedLessonDetail failed without demo fallback', error)
      return null
    }

    console.warn('[course-service] fallback to demo enrolled lesson detail', error)
    return getLessonDetail(courseId, lessonId)
  }
}

async function getPublishedAssessmentDetail(courseId, assessmentId) {
  try {
    return await request(`/mini/courses/${courseId}/assessments/${assessmentId}`)
  } catch (error) {
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getPublishedAssessmentDetail failed without demo fallback', error)
      return null
    }

    console.warn('[course-service] fallback to demo catalog assessment detail', error)
    return getAssessmentDetail(courseId, assessmentId)
  }
}

async function getMyPublishedAssessmentDetail(courseId, assessmentId) {
  try {
    return await request(`/mini/me/courses/${courseId}/assessments/${assessmentId}`)
  } catch (error) {
    if (!ENABLE_DEMO_FALLBACK) {
      console.error('[course-service] getMyPublishedAssessmentDetail failed without demo fallback', error)
      return null
    }

    console.warn('[course-service] fallback to demo enrolled assessment detail', error)
    return getAssessmentDetail(courseId, assessmentId)
  }
}

module.exports = {
  getPublishedCourses,
  getPublishedCourseBundle,
  getMyCourseSummary,
  getMyPublishedCourses,
  getMyPublishedCourseBundle,
  getPublishedLessonDetail,
  getMyPublishedLessonDetail,
  getPublishedAssessmentDetail,
  getMyPublishedAssessmentDetail,
}
