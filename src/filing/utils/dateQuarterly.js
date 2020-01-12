import { FILING_QUARTERS, MIN_QUARTERLY_YEAR } from '../constants/dates'
import { splitYearQuarter } from '../api/utils'

/**
 * Year-Quarter string of currently open quarterly filing period
 */
export const currentQPeriod = (today = new Date()) => {
  const monthDay = getMonthDay(today)

  for (let quarter of Object.keys(FILING_QUARTERS))
    if (isQtrCurrent(quarter, monthDay))
      return `${today.getFullYear()}-${quarter.toUpperCase()}`

  return ''
}

/**
 * A quarterly period is valid if:
 * - Its year is at least 2020
 * - Its year is the current year or a configured-as-open year
 * - Its quarter is currently open or already passed
 */
export const isValidQPeriod = (period, validYears) => {
  const [year, quarter] = splitYearQuarter(period)

  if (!quarter || +year < MIN_QUARTERLY_YEAR) return false

  if (!isCurrentYear(year) && validYears.indexOf(year) === -1) return false

  const monthDay = getMonthDay()
  if (!isQtrCurrent(quarter, monthDay) && !isQtrPassed(quarter, monthDay))
    return false

  return true
}

/**
 * Helpers
 */

const padDate = d => (d < 10 ? `0${d}` : d)

const getMonthDay = (today = new Date()) => {
  const month = today.getMonth() + 1
  const day = today.getDate() + 1
  return `${padDate(month)}/${padDate(day)}`
}

const isQtrCurrent = (qtr, monthDay) => {
  const [lower, upper] = FILING_QUARTERS[qtr].split(' - ')
  return monthDay >= lower && monthDay <= upper
}

const isQtrPassed = (qtr, monthDay) => {
  const upper = FILING_QUARTERS[qtr].split(' - ')[1]
  return monthDay > upper
}

const isCurrentYear = year => year <= new Date().getFullYear()
