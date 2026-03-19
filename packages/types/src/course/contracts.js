const COURSE_ENTITY_FIELDS = [
  'id',
  'name',
  'type',
  'duration',
  'price',
  'benefit',
  'summary',
  'teacher',
  'classroom',
  'classType',
  'classSchedule',
  'status',
]

const ENROLLED_COURSE_FIELDS = [
  'id',
  'courseName',
  'className',
  'teacher',
  'classroom',
  'serviceStatus',
  'lessonProgress',
  'classInfo',
]

module.exports = {
  COURSE_ENTITY_FIELDS,
  ENROLLED_COURSE_FIELDS,
}
