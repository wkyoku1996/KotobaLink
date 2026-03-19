function buildLessonSortKey(lesson) {
  return `${lesson.dateKey} ${lesson.startTime}`
}

function sortLessons(lessons) {
  return lessons.sort((left, right) => {
    return buildLessonSortKey(left).localeCompare(buildLessonSortKey(right))
  })
}

function formatLessonDate(dateKey, startTime) {
  return `${dateKey.slice(5).replace('-', '/')} ${startTime}`
}

module.exports = {
  buildLessonSortKey,
  sortLessons,
  formatLessonDate,
}
