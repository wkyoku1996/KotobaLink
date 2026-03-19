const { getDemoData, setDemoState } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    demo: {},
    activeWord: null,
    showWordModal: false,
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    this.setData({
      demo: getDemoData(),
    })
  },

  completeTask() {
    if (!this.data.demo.dailyTask.allLearned) {
      wx.showToast({
        title: '请先完成 5 个词汇学习',
        icon: 'none',
      })
      return
    }

    setDemoState({
      dailyTaskCompleted: true,
    })
    this.refresh()
    wx.showToast({
      title: '今日打卡已完成',
      icon: 'success',
    })
  },

  goHomework() {
    wx.navigateTo({
      url: '/pages/learning/homework/index',
    })
  },

  openWordCard(event) {
    const { id } = event.currentTarget.dataset
    const activeWord = this.data.demo.dailyTask.vocab.find((item) => item.id === id)
    this.setData({
      activeWord,
      showWordModal: true,
    })
  },

  closeWordCard() {
    this.setData({
      activeWord: null,
      showWordModal: false,
    })
  },

  stopModal() {},

  markWordLearned() {
    const { activeWord, demo } = this.data
    if (!activeWord) {
      return
    }

    const learnedVocabIds = demo.dailyTask.vocab
      .filter((item) => item.learned || item.id === activeWord.id)
      .map((item) => item.id)

    setDemoState({
      learnedVocabIds,
    })

    this.refresh()
    this.setData({
      activeWord: null,
      showWordModal: false,
    })

    wx.showToast({
      title: '已标记为已学习',
      icon: 'success',
    })
  },
}))
