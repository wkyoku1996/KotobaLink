const { getDemoData } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    enrolledCourses: [], // 我的课程
    demo: {}, // 用于存放学生信息等通用数据
    purchasableCourses: [], // 可购买课程
  },

  onShow() {
    this.refreshCourses()
  },

  refreshCourses() {
    const demoData = getDemoData()

    this.setData({
      demo: demoData,
      enrolledCourses: demoData.learningArchive.enrolledCourses,
      purchasableCourses: demoData.courses.filter((item) => !item.isEnrolled),
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
