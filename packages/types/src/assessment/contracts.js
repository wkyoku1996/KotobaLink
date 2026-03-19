const ASSESSMENT_ENTITY_FIELDS = [
  'id',
  'title',
  'type',
  'date',
  'score',
  'summary',
  'feedback',
]

const ASSESSMENT_DETAIL_FIELDS = [
  ...ASSESSMENT_ENTITY_FIELDS,
  'courseName',
  'className',
  'teacher',
]

module.exports = {
  ASSESSMENT_ENTITY_FIELDS,
  ASSESSMENT_DETAIL_FIELDS,
}
