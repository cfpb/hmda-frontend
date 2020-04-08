import { splitYearQuarter } from "../api/utils"
import { afterFilingPeriod, withinFilingPeriod } from "../utils/date"
import receivePeriodOptions from "./receivePeriodOptions"
import requestPeriodOptions from "./requestPeriodOptions"
import fetchAllInstitutions from './fetchAllInstitutions'

const QUARTERS = ["Q1", "Q2", "Q3"]

export default function getFilingPeriodOptions(
  institutions,
  filingPeriods,
  filingQuarters,
  filingQuartersLate
) {
  let periodOptions = generatePeriodOptions(
    filingPeriods,
    filingQuarters,
    filingQuartersLate
  )

  // Only need to check years with quarterly options
  const yearFilterCandidates = new Set(
    periodOptions
      .filter((po) => po.indexOf("-Q") > -1)
      .map((po) => splitYearQuarter(po)[0])
  )

  return (dispatch) => {
    const optionDisplayMap = {}

    dispatch(requestPeriodOptions)

    fetchAllInstitutions(yearFilterCandidates, institutions).then((jsons) => {
      jsons.forEach((json) => {
        // Response object (has URL) vs Institution details object
        let year = json.url
          ? +json.url.split("/").slice(-1)
          : json.institution.activityYear

        // Any quarterly filer = should display year
        if (!json.status)
          optionDisplayMap[year] =
            json.institution.quarterlyFiler || optionDisplayMap[year]
      })

      dispatch(
        receivePeriodOptions(filterOptions(periodOptions, optionDisplayMap))
      )
    })
  }
}

/*********************************************************
********************* Service Methods ********************
**********************************************************/

/**
 * Determine if a filingPeriod is currently open or has passed
 * @param {String} period filingPeriod
 * @param {Object} dates start/end dates for filing
 * @param {Object} datesLate start/end dates for late filing
 */
function shouldAddPeriod(period, dates, datesLate) {
  return (
    withinFilingPeriod(period, dates) ||
    withinFilingPeriod(period, datesLate) ||
    afterFilingPeriod(period, dates) ||
    afterFilingPeriod(period, datesLate)
  )
}

/**
 * Generate a list of viable filingPeriods
 * @param {Array} periods List of open filingPeriods
 * @param {Object} dates start/end dates for filing
 * @param {Object} datesLate start/end dates for late filing
 */
function generatePeriodOptions(periods, dates, datesLate) {
  let options = new Set()

  periods.forEach((fp) => {
    const [year, quarter] = splitYearQuarter(fp)

    // Add all Annual
    if (!quarter) options.add(fp)

    // Add all current/past quarters of year if >= 2020
    if (+year >= 2020) {
      QUARTERS.forEach((qtr) => {
        let candidatePeriod = `${year}-${qtr}`
        if (shouldAddPeriod(candidatePeriod, dates, datesLate))
          options.add(candidatePeriod)
      })
    }
  })

  const result = []
  options.forEach(el => result.push(el))
  return result
}

/**
 * Remove periodOptions that should not be displayed
 * @param {Array} periodOptions List of filingPeriod Strings
 * @param {Object} optionDisplayMap Maps filingYear => shouldDisplay flag
 */
function filterOptions(periodOptions, optionDisplayMap) {
  let filteredOptions = [...periodOptions]

  // TODO: this more efficiently
  Object.keys(optionDisplayMap).forEach((yearKey) => {
    if (!optionDisplayMap[yearKey]) {
      filteredOptions = filteredOptions.filter((po) => {
        // Keep if unrelated to year currently being filtered out
        if (po.indexOf(yearKey) < 0) return true
        // Keep if Annual entry for filtering year
        if (po.indexOf("-Q") < 0) return true
        // Remove Quarterly option
        return false
      })
    }
  })

  return filteredOptions
}
