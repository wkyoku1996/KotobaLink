function parseDateKey(dateKey) {
  return new Date(`${dateKey}T00:00:00`)
}

function formatDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function isDateKeyWithinRange(dateKey, range) {
  return dateKey >= range.min && dateKey <= range.max
}

module.exports = {
  parseDateKey,
  formatDateKey,
  isDateKeyWithinRange,
}
