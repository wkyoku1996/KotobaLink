const GRADE_SCORE_MAP = {
  'A+': 98,
  A: 95,
  'A-': 91,
  'B+': 88,
  B: 84,
  'B-': 80,
  'C+': 76,
  C: 72,
}

function toNumericScore(value) {
  if (typeof value === 'number') {
    return value
  }

  if (GRADE_SCORE_MAP[value] !== undefined) {
    return GRADE_SCORE_MAP[value]
  }

  const parsed = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isNaN(parsed) ? 0 : parsed
}

module.exports = {
  GRADE_SCORE_MAP,
  toNumericScore,
}
