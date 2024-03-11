import { splitYearQuarter } from '../api/utils'
import receivePeriodOptions from './receivePeriodOptions'
import requestPeriodOptions from './requestPeriodOptions'
import fetchAllInstitutions from './fetchAllInstitutions'

/**
 * Determine which filing periods are accessible by a user
 * @param {Array} institutions LEIs associated with this user account
 * @param {Object} filingPeriodStatus Status and meta data of each filing period
 * @returns Thunk
 */
export default function getFilingPeriodOptions(
  institutions,
  filingPeriodStatus,
) {
  // Filter out future filing periods
  const periodOptions = Object.keys(filingPeriodStatus).filter(
    (period) => filingPeriodStatus[period].isVisible,
  )

  let yearsWithQuarterly = new Set(
    periodOptions
      .filter((period) => filingPeriodStatus[period].isQuarterly)
      .map((period) => splitYearQuarter(period)[0]),
  )

  return (dispatch) => {
    const optionDisplayMap = {}

    dispatch(requestPeriodOptions)

    fetchAllInstitutions(yearsWithQuarterly, institutions).then((jsons) => {
      jsons.forEach((json) => {
        if (!json || json.status) return // An error has occurred
        const { activityYear, quarterlyFiler } = json.institution
        if (!activityYear) return

        // Display filing year if account has any quarterly filers
        optionDisplayMap[activityYear] =
          quarterlyFiler || optionDisplayMap[activityYear]
      })

      dispatch(
        receivePeriodOptions(filterOptions(periodOptions, optionDisplayMap)),
      )
    })
  }
}

/**
 * Remove periodOptions that should not be displayed
 * @param {Array} periodOptions List of filingPeriod Strings
 * @param {Object} optionDisplayMap Maps filingYear => shouldDisplay flag
 */
function filterOptions(periodOptions, optionDisplayMap) {
  let keepers = []

  periodOptions.forEach((po) => {
    const [yr, hasQtr] = splitYearQuarter(po)
    if (!optionDisplayMap[yr] && hasQtr) return
    keepers.push(po)
  })

  return keepers
}
