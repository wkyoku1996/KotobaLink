const { getEnrolledCourseDetail } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    detail: null,
    courseId: null,
  },

  onLoad(options) {
    if (options.id) {
      this.loadCourseData(options.id)
    }
  },

  loadCourseData(courseId) {
    const detail = getEnrolledCourseDetail(courseId)

    if (detail) {
      this.setData({
        detail,
        courseId,
      })
      wx.setNavigationBarTitle({ title: detail.title })
    }
  },

  openLessonDetail(event) {
    const { lessonId } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/learning/lesson-detail/index?courseId=${this.data.courseId}&lessonId=${lessonId}`,
    })
  },

  openAssessmentDetail(event) {
    const { assessmentId } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/learning/assessment-detail/index?courseId=${this.data.courseId}&assessmentId=${assessmentId}`,
    })
  },
}))
