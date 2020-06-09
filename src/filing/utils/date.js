import { splitYearQuarter } from '../api/utils.js'

export const months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(
  ','
)

export function nth(d) {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export function padZero(n) {
  if (n > 9 || n < -9) return '' + n
  return n < 0 ? '-0' + -n : '0' + n
}

export function ordinal(d) {
  const month = months[d.getMonth()]
  const day = d.getDate()

  return `${month} ${day + nth(day)}, ${d.getFullYear()}`
}

export function ordinalHour(d) {
  const mil = d.getHours()
  const period = mil > 11 ? 'PM' : 'AM'
  const hour = mil % 12 ? mil % 12 : 12
  const min = padZero(d.getMinutes())
  const sec = padZero(d.getSeconds())

  return `${ordinal(d)}, ${hour}:${min}:${sec} ${period}`
}

export function afterFilingPeriod(period, filingQuarters) {
  if(openForPreview(period, filingQuarters)) return false
  const timezoneOffsetHours = new Date().getTimezoneOffset() / 60 // Calculate UTC Hours Offset
  let [year, quarter] = splitYearQuarter(period)
  year = parseInt(year, 10)
  const yearAdjusted = quarter ? year : year + 1
  const endDate = quarter
    ? qtrBoundaryDate(quarter, filingQuarters, 1)
    : qtrBoundaryDate("ANNUAL", filingQuarters, 1)
  const deadline = Date.UTC(
    yearAdjusted,
    endDate.month,
    endDate.day,
    23 + timezoneOffsetHours, // 1 second before Midnight, local time
    59,
    59
  )
  if (!deadline) throw new Error('Error calculating filing period deadline')
  return Date.now() > deadline
}

export function beforeFilingPeriod(period, filingQuarters) {
  if(openForPreview(period, filingQuarters)) return false
  const timezoneOffsetHours = new Date().getTimezoneOffset() / 60 // Calculate UTC Hours Offset
  let [year, quarter] = splitYearQuarter(period)
  year = parseInt(year, 10)
  const yearAdjusted = quarter ? year : year + 1
  const startDate = quarter
    ? qtrBoundaryDate(quarter, filingQuarters)
    : qtrBoundaryDate("ANNUAL", filingQuarters)
  const start = Date.UTC(
    yearAdjusted,
    startDate.month,
    startDate.day,
    timezoneOffsetHours, // Midnight, local time
    0,
    0
  )
  if (!start) throw new Error("Error calculating filing period starting date")
  return Date.now() < start
}

export function withinFilingPeriod(year, filingQuarters) {
  return !beforeFilingPeriod(year, filingQuarters) && !afterFilingPeriod(year, filingQuarters)
}

// MonthName DayNumber
export const formattedQtrBoundaryDate = (qtr, filingQuarters, startOrEnd=1) => {
  const date = qtrBoundaryDate(qtr, filingQuarters, startOrEnd)
  return formattedBoundaryDate(date)
}

// Format quarterly end date for creation of Date object
export const qtrBoundaryDate = (qtr, filingQuarters, startOrEnd=0) => {
  const monthDay = filingQuarters[qtr].split(' - ')[startOrEnd]
  const [month, day] = monthDay.split('/').map(s => parseInt(s, 10))
  return { day, month: month - 1 }
}

export const formattedBoundaryDate = (obj) => `${months[obj.month]} ${obj.day}`

// Allow for a period to be opened for pre-release without causing ripple effects
const openForPreview = (period, filingQuarters) => {
  const previewPeriods = filingQuarters && filingQuarters.PREVIEW
  if(!previewPeriods) return false
  return previewPeriods.indexOf(period) > -1
}