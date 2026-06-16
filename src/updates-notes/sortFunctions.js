import { ordinal } from '../filing/utils/date'
import { CATEGORIES } from './constants'

const normalizeDateForSlug = (date = '') => {
  const [rawMonth = '', rawDay = '', rawYear = ''] = String(date).split('/')
  if (!rawMonth || !rawDay || !rawYear) return '00-00-00'

  const month = rawMonth.padStart(2, '0')
  const day = rawDay.padStart(2, '0')
  const year = rawYear.slice(-2).padStart(2, '0')

  return `${month}-${day}-${year}`
}

const sanitizeSlugPart = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .join('-')

const firstTenWordsForSlug = (description = '') => {
  const words = String(description)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 10)

  return words.join('-') || 'post'
}

const buildPostSlug = ({ date, type, description }) => {
  const datePart = normalizeDateForSlug(date)
  const typePart = sanitizeSlugPart(type) || 'update'
  const wordsPart = firstTenWordsForSlug(description)
  return `${datePart}-${typePart}-${wordsPart}`
}

/** Sort by Type */
export const byType = (a, b) => {
  if (!a.type || !b.type || CATEGORIES[a.type] > CATEGORIES[b.type]) return 0
  if (CATEGORIES[a.type].order > CATEGORIES[b.type].order) return 1
  if (CATEGORIES[a.type].order < CATEGORIES[b.type].order) return -1
  return -1
}

/** Sort by Date field */
export const byDate = (a, b) => new Date(b.date) - new Date(a.date)

/** Groups and sorts change log entries by date */
export const organizeChangeData = (input) => {
  let data = input && input.log ? input.log : {}
  data = data.sort(byDate)
  const result = {}

  data.forEach((item) => {
    if (!item || !item.date) return
    if (!item.changeDateOrdinal)
      item.changeDateOrdinal = ordinal(new Date(item.date || 0), {
        nthDate: false,
      })
    if (!item.slug) item.slug = buildPostSlug(item)
    if (!result[item.date]) result[item.date] = []
    result[item.date].push({ ...item })
  })

  Object.keys(result).forEach((date) => {
    result[date] = result[date].sort(byType)
  })

  return result
}
