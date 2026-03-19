const { getMessagesData, getDemoState, setDemoState } = require('../../../services/demo-service')
const { withAccessibility } = require('../../../behaviors/with-accessibility')

Page(withAccessibility({
  data: {
    activeFilter: 'all',
    messageData: null,
    visibleMessages: [],
    activeMessage: null,
    showMessageDetail: false,
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const messageData = getMessagesData()
    this.setData({
      messageData,
      visibleMessages: this.filterMessages(messageData.messages, this.data.activeFilter),
    })
  },

  filterMessages(messages, activeFilter) {
    if (activeFilter === 'all') {
      return messages
    }
    return messages.filter((item) => item.category === activeFilter)
  },

  switchFilter(event) {
    const { key } = event.currentTarget.dataset
    const { messageData } = this.data
    this.setData({
      activeFilter: key,
      visibleMessages: this.filterMessages(messageData.messages, key),
    })
  },

  openMessage(event) {
    const { id } = event.currentTarget.dataset
    const state = getDemoState()
    const currentIds = state.readNotificationIds || []
    const isRead = currentIds.includes(id)

    if (!isRead) {
      setDemoState({
        readNotificationIds: [...currentIds, id],
      })
    }

    this.refresh()

    const messageData = getMessagesData()
    const activeMessage = messageData.messages.find((item) => item.id === id) || null
    this.setData({
      messageData,
      visibleMessages: this.filterMessages(messageData.messages, this.data.activeFilter),
      activeMessage,
      showMessageDetail: !!activeMessage,
    })
  },

  closeMessageDetail() {
    this.setData({
      activeMessage: null,
      showMessageDetail: false,
    })
  },

  stopModal() {},
}))
