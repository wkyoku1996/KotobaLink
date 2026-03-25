const { getScheduleLessonById, getDemoData, setDemoState } = require('../../../services/demo-service')
const { getPublishedCourseBundle } = require('../../../services/course-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    detail: null,
    course: null,
    lesson: null,
    detailMode: 'catalog',
    isPurchased: false,
  },

  onLoad(options) {
    this.options = options
    this.refresh(options)
  },

  onShow() {
    if (this.options) {
      this.refresh(this.options)
    }
  },

  async refresh(options) {
    const bundle = await getPublishedCourseBundle(options.id)
    const course = bundle ? bundle.course : null
    const detail = bundle ? bundle.detail : null
    const detailMode = options.source === 'schedule' ? 'schedule' : 'catalog'
    const lesson = detailMode === 'schedule'
      ? getScheduleLessonById(options.lessonId)
      : null
    const demo = getDemoData()
    const isPurchased = course
      ? demo.learningArchive.enrolledCourses.some((item) => String(item.id) === String(course.id))
      : false

    if (!course || !detail) {
      return
    }

    this.setData({
      detail,
      course,
      lesson,
      detailMode,
      isPurchased,
    })
    wx.setNavigationBarTitle({
      title: course.name,
    })
  },

  purchaseCourse() {
    const { course, isPurchased } = this.data
    if (!course || isPurchased) {
      return
    }

    const demo = getDemoData()
    const purchasedCourseIds = demo.state.purchasedCourseIds || []

    setDemoState({
      purchased: true,
      purchasedCourseIds: purchasedCourseIds.includes(course.id)
        ? purchasedCourseIds
        : [...purchasedCourseIds, course.id],
      lastPurchasedCourseId: course.id,
    })
    this.setData({ isPurchased: true })
    wx.navigateTo({
      url: `/pages/commerce/payment/index?courseId=${course.id}`,
    })
  },

  openLessonDetail(event) {
    const { lessonId } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/learning/lesson-detail/index?courseId=${this.data.course.id}&lessonId=${lessonId}&enrolled=${this.data.isPurchased ? 1 : 0}`,
    })
  },
}))
