import { ordinal } from '../filing/utils/date'
import { CATEGORIES } from './constants'

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
    if (!result[item.date]) result[item.date] = []
    result[item.date].push({ ...item })
  })

  Object.keys(result).forEach((date) => {
    result[date] = result[date].sort(byType)
  })

  return result
}
