const NOTIFICATION_CATEGORIES = ['system', 'teacher', 'task', 'activity']
const MESSAGE_FILTER_KEYS = ['all', ...NOTIFICATION_CATEGORIES]
const SERVICE_STATUSES = ['已开通', '待开通', '已暂停']
const ACTIVITY_STATUSES = ['可报名', '已报名', '已结束']
const HOMEWORK_STATUSES = ['待提交', '已提交', '待点评']
const LESSON_STATUSES = ['已完成', '待上课', '可预约', '已取消']
const ORDER_STATUSES = ['待支付', '已支付', '已关闭', '已退款']

module.exports = {
  NOTIFICATION_CATEGORIES,
  MESSAGE_FILTER_KEYS,
  SERVICE_STATUSES,
  ACTIVITY_STATUSES,
  HOMEWORK_STATUSES,
  LESSON_STATUSES,
  ORDER_STATUSES,
}
