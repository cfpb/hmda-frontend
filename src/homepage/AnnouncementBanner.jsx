import React from 'react'
import ConfiguredAlert from '../common/ConfiguredAlert'
import { numDaysBetween } from '../filing/utils/date.js'
import { splitYearQuarter } from '../filing/api/utils.js'
import { OptionCarousel } from '../common/OptionCarousel'
import { getOpenFilingYears } from '../common/constants/configHelpers'
import { parseTimedGuardDate } from '../deriveConfig'

/**
 * Length of time, in days, to display the announcement
 * after the event has occurred.
 */
const SCHEDULED_EVENT_DURATIONS = {
  annualOpen: 60, // Annual Filing period is open.
  annualLate: 30, // Annual resubmissions still accepted.
  annualClose: 7, // Annual resubmissions no longer accepted.
  quarterlyOpen: 60, // Quarterly Filing period is open.
  quarterlyClose: 0, // Quarterly Filing period is closed (no message)
}

/**
 * Check if an event's occurrence was within SCHEDULED_EVENT_DURATIONS[evt] number of days
 * @param {String} eventId
 * @param {Date} eventDate Deadline date of event
 * @returns Boolean
 */
const isEventWithinRange = (eventId, eventDate) => {
  const diff = numDaysBetween(new Date(), eventDate)
  if (diff < 0) return false
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
 * @param {Object} filingPeriodStatus Status and meta data of each filing period
 * @returns Array[ConfiguredAlert]
 */
const scheduledFilingAnnouncements = (defaultPeriod, filingPeriodStatus) => {
  const [year, quarter] = splitYearQuarter(defaultPeriod)
  const annualFilingYear = quarter ? parseInt(year) - 1 : parseInt(year)
  const closingAnnualFiling = new Date().getFullYear() - 4
  const announcements = []

  let status = filingPeriodStatus[defaultPeriod]

  /*** Quarterly Filing Announcements ***/

  // Only display Quarterly announcements during Quarterly Filing periods
  if (quarter) {
    // Quarterly Filing Open
    if (isEventWithinRange('quarterlyOpen', status.dates.start)) {
      announcements.push(
        <ConfiguredAlert
          heading={`${status.period} Quarterly filing period is open`}
          message={`Submissions of ${status.period} HMDA data will be accepted through ${status.lateDate}.`}
          type='success'
        />,
      )
    }
  }

  /*** Annual Filing Announcements ***/

  // Annual announcements may overlap with Quarterly announcements, so we will always check for these.
  status = filingPeriodStatus[annualFilingYear]

  // Annual Filing Open
  if (isEventWithinRange('annualOpen', status.dates.start)) {
    announcements.push(
      <ConfiguredAlert
        heading={`${status.period} Annual filing period is open`}
        message={`Submissions of ${status.period} HMDA data will be considered timely if received on or before ${status.lateDate}. `}
        type='success'
      />,
    )
  }

  // Annual Filing Resubmission period begins
  if (isEventWithinRange('annualLate', status.dates.late)) {
    const openFilingRange = availableAnnualRange(
      getOpenFilingYears({ filingPeriodStatus }),
    )

    announcements.push(
      <ConfiguredAlert
        heading={`${annualFilingYear} Annual filing deadline has passed`}
        message={`The HMDA Platform remains available outside of the filing period for late submissions and resubmissions of ${openFilingRange} HMDA data.`}
        type='info'
      />,
    )
  }

  // Annual Filing Resubmission period ends
  status = filingPeriodStatus[closingAnnualFiling]

  if (isEventWithinRange('annualClose', status.dates.end)) {
    announcements.push(
      <ConfiguredAlert
        heading={`${status.period} Annual filing is closed`}
        message={`The HMDA Platform no longer accepts late submissions or resubmissions of ${status.period} HMDA data.`}
        type='warning'
      />,
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
 * @param {Object} filingPeriodStatus Status and meta data of each filing period
 * @returns
 */
export const AnnouncementBanner = ({
  announcement,
  defaultPeriod,
  filingPeriodStatus,
}) => {
  // Collect all scheduled announcements
  const announcements = scheduledFilingAnnouncements(
    defaultPeriod,
    filingPeriodStatus,
  )

  // Prioritize the message set in the external configuration
  if (announcement) {
    if (Array.isArray(announcement)) {
      // Support multiple unscheduled announcements
      announcement.length &&
        announcement
          .reverse()
          .filter(
            (item) =>
              !item.endDate ||
              Date.now() < parseTimedGuardDate(item.endDate, true),
          )
          .forEach((item) =>
            announcements.unshift(<ConfiguredAlert {...item} />),
          )
    } else if (announcement) {
      // Single announcement object (maintenance script)
      announcements.unshift(<ConfiguredAlert {...announcement} />)
    }
  }

  // Display an auto-advancing, navigable carousel of announcements
  return (
    <OptionCarousel
      id='oc-homepage-banner'
      options={announcements}
      cycleTime={5}
      hideIcon
      showControls
    />
  )
}

export default AnnouncementBanner
