import * as dates from '../constants/dates.js'
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

export function withinAWeekOfDeadline(year) {
  const yearPlusOne = parseInt(year, 10) + 1
  const deadline = Date.UTC(
    yearPlusOne,
    dates.FILING_DEADLINE.month,
    dates.FILING_DEADLINE.day,
    28,
    59,
    59 //28 is 23 in UTC-0500
  )
  const week = Date.UTC(
    year,
    dates.ONE_WEEK_TO_FILE.month,
    dates.ONE_WEEK_TO_FILE.day,
    5,
    0,
    0 //5 is 0 in UTC-0500
  )
  if (!deadline || !week)
    throw new Error('Error calculating filing deadline status')
  const today = Date.now()
  return today >= week && today <= deadline
}

export function afterFilingPeriod(period) {
  const timezoneOffsetHours = new Date().getTimezoneOffset() / 60 // Calculate UTC Hours Offset
  let [year, quarter] = splitYearQuarter(period)
  year = parseInt(year, 10)
  const yearAdjusted = quarter ? year : year + 1
  const endDate = quarter ? qtrBoundaryDate(quarter, 1) : dates.FILING_DEADLINE
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

export function beforeFilingPeriod(period) {
  let [year, quarter] = splitYearQuarter(period)
  year = parseInt(year, 10)
  const yearAdjusted = quarter ? year : year + 1
  const startDate = quarter ? qtrBoundaryDate(quarter) : dates.FILING_START
  const start = Date.UTC(
    yearAdjusted,
    startDate.month,
    startDate.day,
    5,
    0,
    0 //5 is 0 in UTC-0500
  )
  if (!start) throw new Error('Error calculating filing period starting date')
  return Date.now() < start
}

export function withinFilingPeriod(year) {
  return !beforeFilingPeriod(year) && !afterFilingPeriod(year)
}

// MonthName DayNumber
export const formattedQtrBoundaryDate = (qtr, startOrEnd=1) => {
  const date = qtrBoundaryDate(qtr, startOrEnd)
  return `${months[date.month]} ${date.day}`
}

// Format quarterly end date for creation of Date object
export const qtrBoundaryDate = (qtr, startOrEnd=0) => {
  const monthDay = dates.FILING_QUARTERS[qtr].split(' - ')[startOrEnd]
  const [month, day] = monthDay.split('/').map(s => parseInt(s, 10))
  return { day, month: month - 1 }
}
