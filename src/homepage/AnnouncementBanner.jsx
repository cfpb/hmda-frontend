import React from 'react'
import ConfiguredAlert from '../common/ConfiguredAlert'
import {
  formattedQtrBoundaryDate,
  numDaysBetween,
  qtrBoundaryDate,
} from '../filing/utils/date.js'
import { splitYearQuarter } from '../filing/api/utils.js'
import { OptionCarousel } from '../common/OptionCarousel'

const TIMEZONE_OFFSET_HOURS = new Date().getTimezoneOffset() / 60

/* Length of time, in days, to display the announcement after the event has occurred. */
const SCHEDULED_EVENT_DURATIONS = {
  annualOpen: 45,    // Annual Filing period is open.
  annualClose: 30,   // Annual Filing Timely deadline is passed.  Resubmissions still accepted.
  quarterlyOpen: 30, // Quarterly Filing period is open.
  quarterlyClose: 0, // Quarterly Filing period is closed (no message)
}

/**
 * Create a UTC timestamp for the given day/month/year at 11:59:59pm
 * @param {Object} dayMonthObj
 * @param {Number} dayMonthObj.day // Day of month (1-31)
 * @param {Number} dayMonthObj.month // JS Month (0-11)
 * @returns Number
 */
const getDeadline = (dayMonthObj) => {
  return Date.UTC(
    new Date().getFullYear(),
    dayMonthObj.month,
    dayMonthObj.day,
    23 + TIMEZONE_OFFSET_HOURS,
    59,
    59
  )
}

/**
 * Check if an event's occurrence was within SCHEDULED_EVENT_DURATIONS[evt] number of days
 * @param {String} eventId
 * @param {Object} dayMonth
 * @param {Number} dayMonth.day Day of month (1-31)
 * @param {Number} dayMonth.month Javascript Month (0-11)
 * @returns Boolean
 */
const isEventWithinRange = (eventId, dayMonth) => {
  const deadline = getDeadline(dayMonth)
  const diff = numDaysBetween(new Date(), new Date(deadline))
  return diff < SCHEDULED_EVENT_DURATIONS[eventId]
}

/**
 * Formatted String of currently available Annual filing periods
 * ex. "2018 - 2020"
 * @param {Array} filingPeriods
 * @returns String
 */
const availableAnnualRange = (filingPeriods) => {
  const annualPeriods = filingPeriods
    .filter((x) => x.indexOf('Q') === -1)
    .sort()
  return annualPeriods[0] + ' - ' + annualPeriods[annualPeriods.length - 1]
}

/**
 * Create Alerts for all current Filing period events
 * @param {String} defaultPeriod Current Filing period
 * @param {Object} filingQuarters Date ranges for which Filing periods are accessible
 * @returns Array[ConfiguredAlert]
 */
const scheduledFilingAnnouncements = (
  defaultPeriod,
  filingQuarters,
  filingPeriods
) => {
  const [year, quarter] = splitYearQuarter(defaultPeriod)
  const annualFilingYear = parseInt(year) - 1
  const announcements = []
  let startDate, endDate

  /*** Quarterly Filing Announcements ***/
  
  // Only display Quarterly announcements during Quarterly Filing periods
  if (quarter) {
    startDate = qtrBoundaryDate(quarter, filingQuarters, 0)
    endDate = qtrBoundaryDate(quarter, filingQuarters, 1)

    // Quarterly Filing Open
    if (isEventWithinRange('quarterlyOpen', startDate)) {
      const quarterlyDeadline = formattedQtrBoundaryDate(quarter, filingQuarters, 1) + `, ${year}`

      announcements.push(
        <ConfiguredAlert
          heading={`${defaultPeriod} Quarterly filing period is open`}
          message={`Submissions of ${defaultPeriod} HMDA data will be accepted through ${quarterlyDeadline}.`}
          type='success'
        />
      )
    }
  }

  /*** Annual Filing Announcements ***/
  
  // Annual announcements may overlap with Quarterly announcements, so we will always check for these.
  startDate = qtrBoundaryDate('ANNUAL', filingQuarters, 0)
  endDate = qtrBoundaryDate('ANNUAL', filingQuarters, 1)

  // Annual Filing Open
  if (isEventWithinRange('annualOpen', startDate)) {
    const annualDeadline = formattedQtrBoundaryDate('ANNUAL', filingQuarters, 1) + `, ${year}`
    announcements.push(
      <ConfiguredAlert
        heading={`${annualFilingYear} Annual filing period is open`}
        message={`Submissions of ${annualFilingYear} HMDA data will be considered timely if received on or before ${annualDeadline}. `}
        type='success'
      />
    )
  }

  // Annual Filing Resubmission period
  if (isEventWithinRange('annualClose', endDate)) {
    announcements.push(
      <ConfiguredAlert
        heading={`${annualFilingYear} Annual filing period is closed`}
        message={`The HMDA Platform remains available outside of the filing period for late submissions and resubmissions of ${availableAnnualRange(
          filingPeriods
        )} HMDA data.`}
        type='info'
      />
    )
  }

  return announcements
}

/**
 * Display scheduled and configured Announcements on the HMDA Homepage.
 * Scheduled announcements are defined in this file.
 * Configured announcements are injected from the external environment config.
 * @param {Object} announcement
 * @param {String} defaultPeriod
 * @param {Object} filingQuarters
 * @returns
 */
export const AnnouncementBanner = ({
  announcement,
  defaultPeriod,
  filingQuarters,
  filingPeriods,
}) => {
  // Collect all scheduled announcements
  const announcements = scheduledFilingAnnouncements(defaultPeriod, filingQuarters, filingPeriods)

  // Prioritize the message set in the external configuration
  if (announcement) announcements.unshift(<ConfiguredAlert {...announcement} />)

  // Display an auto-advancing, navigable carousel of announcements
  return (
    <OptionCarousel
      id='oc-homepage-banner'
      options={announcements}
      cycleTime={5}
      hideIcon
      showControls
      fixedHeight='100px'
    />
  )
}

export default AnnouncementBanner