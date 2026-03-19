const LESSON_ENTITY_FIELDS = [
  'id',
  'title',
  'dateKey',
  'date',
  'startTime',
  'endTime',
  'status',
  'summary',
  'className',
  'teacher',
  'classroom',
  'outline',
  'vocab',
  'grammar',
]

const LESSON_DETAIL_FIELDS = [
  ...LESSON_ENTITY_FIELDS,
  'courseName',
  'practice',
  'isEnrolledLesson',
]

module.exports = {
  LESSON_ENTITY_FIELDS,
  LESSON_DETAIL_FIELDS,
}
