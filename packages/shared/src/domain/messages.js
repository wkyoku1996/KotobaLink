const MESSAGE_FILTER_LABELS = {
  all: '全部',
  system: '系统消息',
  teacher: '教师消息',
  task: '任务提醒',
  activity: '活动提醒',
}

function sortMessagesByPriority(messages) {
  return [...messages].sort((left, right) => {
    if (left.important !== right.important) {
      return left.important ? -1 : 1
    }

    if (left.read !== right.read) {
      return left.read ? 1 : -1
    }

    return right.time.localeCompare(left.time)
  })
}

function buildMessageFilters(messages, labelMap = MESSAGE_FILTER_LABELS) {
  return Object.keys(labelMap).map((key) => ({
    key,
    label: labelMap[key],
    count: key === 'all'
      ? messages.length
      : messages.filter((item) => item.category === key).length,
  }))
}

module.exports = {
  MESSAGE_FILTER_LABELS,
  sortMessagesByPriority,
  buildMessageFilters,
}
