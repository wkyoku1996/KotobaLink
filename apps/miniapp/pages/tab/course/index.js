const { getMyPublishedCourses, getPublishedCourses, getMyCourseSummary } = require('../../../services/course-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    enrolledCourses: [], // 我的课程
    summary: {},
    purchasableCourses: [], // 可购买课程
  },

  onShow() {
    this.refreshCourses()
  },

  async refreshCourses() {
    const [summary, myCourses, publishedCourses] = await Promise.all([
      getMyCourseSummary(),
      getMyPublishedCourses(),
      getPublishedCourses(),
    ])

    this.setData({
      summary,
      enrolledCourses: myCourses,
      purchasableCourses: publishedCourses,
    })
  },

  goToEnrolledCourseDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/account/profile-course-detail/index?id=${id}`,
    })
  },

  goToPurchasableCourseDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/catalog/course-detail/index?id=${id}`,
    })
  },
}))
