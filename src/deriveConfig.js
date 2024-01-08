import { getFilingPeriods } from './common/constants/configHelpers'
import { splitYearQuarter } from './filing/api/utils'
import { easternOffsetHours } from './filing/utils/date'

export const PERIODS = ['Q3', 'Q2', 'Q1', 'annual']

/**
 * Driver function - Adds derived configuration
 * @param {Object} baseConfig
 * @returns enhanced config object
 */
export function deriveConfig(baseConfig) {
  const config = JSON.parse(JSON.stringify(baseConfig))

  // Order matters
  config.filingPeriodStatus = calcFilingPeriodStatus(config)
  config.defaultPeriod = calcDefaultPeriod(config)
  config.defaultDocsPeriod = calcDefaultDocsPeriod(config)
  return config
}

/**
 * Types - Useful for a config generator tool?
 **/

const FilingPeriodStatus = {
  endDate: {
    type: Date,
    description:
      'After this date, at midnight ET, users will no longer be able to submit new files to the HMDA Platform',
  },
  isClosed: {
    type: Boolean,
    description: "Are we past this filing period's {endDate}?",
  },
  isLate: {
    type: Boolean,
    description: "Are we past this filing period's {lateDate}?",
  },
  isOpen: {
    type: Boolean,
    description: "Are we past this filing period's {startDate}?",
  },
  isQuarterly: {
    type: Boolean,
    description:
      'Does the currently selected filing period have quarterly filing?',
  },
  isVisible: {
    type: Boolean,
    description: 'Should this filing period be available to Platform users?',
  },
  isPassed: { type: Boolean, description: 'Is this filing period closed' },
  lateDate: {
    type: Date,
    description:
      'After this date, at midnight ET, new submissions to the HMDA Platform will no longer be considered timely',
  },
  period: { type: String, description: 'Currently selected year-period' },
  startDate: {
    type: Date,
    description: 'Start filing submissions beginning at 12am',
  },
}

/**
 * Calculators
 **/

const calcFilingPeriodStatus = (config) => {
  const now = Date.now()
  const timedGuards = config.timedGuards
  const dateIsDeadline = [false, true, true]

  const filingPeriodStatus = {}

  potentialYears().forEach((year) => {
    PERIODS.forEach((period) => {
      if (!timedGuards || !timedGuards[year] || !timedGuards[year][period])
        return

      let periodString = `${year}`
      if (period.includes('Q')) periodString += `-${period}`

      // Parse timed guards into Date objects
      const [startOfCollection, startOfLateFiling, collectionDeadline] =
        timedGuards[year][period]
          .split('-')
          .map((dateString, idx) =>
            parseTimedGuardDate(dateString.trim(), dateIsDeadline[idx]),
          )

      // Collect all pertinant info about the filing period
      const thisPeriod = {
        period: periodString,
        startDate: formatLocalString(startOfCollection),
        lateDate: formatLocalString(startOfLateFiling),
        endDate: formatLocalString(collectionDeadline),
        isVisible: true,
        dates: {
          start: startOfCollection,
          late: startOfLateFiling,
          end: collectionDeadline,
        },
      }

      if (period.includes('Q')) thisPeriod.isQuarterly = true

      // Preview periods are considered "Open"
      if (timedGuards.preview.includes(periodString)) {
        thisPeriod.isOpen = true
        // Save this period
        filingPeriodStatus[periodString] = thisPeriod
        return
      }

      // Set the filing period statuses based on timed guards
      if (now > collectionDeadline)
        thisPeriod.isClosed = thisPeriod.isPassed = true
      else if (now > startOfLateFiling) thisPeriod.isLate = true
      else if (now > startOfCollection) thisPeriod.isOpen = true
      else {
        // Future period
        thisPeriod.isClosed = true
        thisPeriod.isVisible = false
      }

      if (periodString == '2017') thisPeriod.isVisible = false

      // Save this period
      filingPeriodStatus[periodString] = thisPeriod
    })
  })

  return filingPeriodStatus
}

/* The most recent filing period to start accepting submissions */
const calcDefaultPeriod = (config) => {
  const reachableViaUI = getFilingPeriods(config)

  const acceptingSubmissions = reachableViaUI
    .filter((period) => {
      const { isOpen, isLate } = config.filingPeriodStatus[period]
      return isOpen || isLate
    })
    .sort()

  const latest = acceptingSubmissions.pop()
  const [year, _qtr] = splitYearQuarter(latest)

  // Annual filing is later than Quarterly for the same year
  // but I don't want to write a custom sort function.
  if (acceptingSubmissions.includes(year)) return year

  return latest
}

/* The documentation year correlating to defaultFilingPeriod */
const calcDefaultDocsPeriod = (config) =>
  splitYearQuarter(config.defaultPeriod)[0]

/**
 * Helpers
 **/

function potentialYears(start = 2017) {
  let current = start < 2017 ? 2017 : start
  const output = []
  const maxYear = new Date().getFullYear() + 1

  while (current <= maxYear) {
    output.unshift(current)
    current++
  }
  return output
}

/**
 * Converts a date string into a Date object for deadline calculations
 * @param {String} str mm-dd-yyyy
 * @param {Boolean} isDeadline Use end of day (11:59pm ET) for Date?
 * @returns Date (Eastern time)
 */
export function parseTimedGuardDate(str, isDeadline = false) {
  let [month, day, year] = str.split('/').map((s) => parseInt(s, 10))
  month = month - 1 // JS months are 0 indexed

  // The addition of abs() is a workaround for our Cypress testing pods, which seem to run in UTC
  const offset = Math.abs(easternOffsetHours())

  if (isDeadline)
    // End of day
    return new Date(
      year,
      month,
      day,
      23 - offset, // 11:59pm ET
      59,
      59,
    )

  // Start of Day
  return new Date(
    year,
    month,
    day,
    0 - offset, // 12am ET
    0,
    0,
  )
}

/**
 * Date string in Eastern Time
 * @param {Date} date
 * @returns String
 */
export function formatLocalString(date) {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    timeZone: 'America/New_York',
  })
}
