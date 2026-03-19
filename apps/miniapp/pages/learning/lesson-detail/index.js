const { getLessonDetail } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    lesson: null,
    practiceAnswers: {},
    practiceResult: null,
  },

  onLoad(options) {
    const lesson = getLessonDetail(options.courseId, options.lessonId)

    if (!lesson) {
      return
    }

    this.setData({ lesson })
    wx.setNavigationBarTitle({
      title: lesson.title,
    })
  },

  selectOption(event) {
    const { questionId, option } = event.currentTarget.dataset
    this.setData({
      practiceAnswers: {
        ...this.data.practiceAnswers,
        [questionId]: option,
      },
    })
  },

  inputBlank(event) {
    const { questionId } = event.currentTarget.dataset
    this.setData({
      practiceAnswers: {
        ...this.data.practiceAnswers,
        [questionId]: event.detail.value,
      },
    })
  },

  submitPractice() {
    const { lesson, practiceAnswers } = this.data
    if (!lesson || !lesson.practice) {
      return
    }

    let correctCount = 0
    const total = lesson.practice.questions.length

    lesson.practice.questions.forEach((question) => {
      const userAnswer = (practiceAnswers[question.id] || '').trim()
      const expected = question.type === 'choice'
        ? question.correctAnswer
        : question.answer

      if (userAnswer === expected) {
        correctCount += 1
      }
    })

    this.setData({
      practiceResult: {
        correctCount,
        total,
      },
    })
  },

  resetPractice() {
    this.setData({
      practiceAnswers: {},
      practiceResult: null,
    })
  },
}))
