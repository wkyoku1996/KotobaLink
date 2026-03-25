const {
  getMyPublishedAssessmentDetail,
  getPublishedAssessmentDetail,
} = require('../../../services/course-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    assessment: null,
    answers: {},
    result: null,
  },

  async onLoad(options) {
    const assessment = options.enrolled === '1'
      ? await getMyPublishedAssessmentDetail(options.courseId, options.assessmentId)
      : await getPublishedAssessmentDetail(options.courseId, options.assessmentId)
    if (!assessment) {
      return
    }

    this.setData({ assessment })
    wx.setNavigationBarTitle({
      title: assessment.title,
    })
  },

  selectOption(event) {
    const { questionId, option } = event.currentTarget.dataset
    this.setData({
      answers: {
        ...this.data.answers,
        [questionId]: option,
      },
    })
  },

  inputBlank(event) {
    const { questionId } = event.currentTarget.dataset
    this.setData({
      answers: {
        ...this.data.answers,
        [questionId]: event.detail.value,
      },
    })
  },

  submitAssessment() {
    const { assessment, answers } = this.data
    if (!assessment) {
      return
    }

    let correctCount = 0
    const total = assessment.questions.length

    assessment.questions.forEach((question) => {
      const userAnswer = (answers[question.id] || '').trim()
      const expected = question.type === 'choice' ? question.correctAnswer : question.answer
      if (userAnswer === expected) {
        correctCount += 1
      }
    })

    this.setData({
      result: {
        correctCount,
        total,
      },
    })
  },

  resetAssessment() {
    this.setData({
      answers: {},
      result: null,
    })
  },
}))
