import { splitYearQuarter } from "../api/utils"
import receivePeriodOptions from "./receivePeriodOptions"
import requestPeriodOptions from "./requestPeriodOptions"
import fetchAllInstitutions from './fetchAllInstitutions'

export default function getFilingPeriodOptions(institutions, filingPeriods) {
  // Only need to check years with quarterly options
  const yearFilterCandidates = new Set(
    filingPeriods
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

        // Any quarterly filer = should display year's quarters
        if (!json.status)
          optionDisplayMap[year] =
            json.institution.quarterlyFiler || optionDisplayMap[year]
      })

      dispatch(
        receivePeriodOptions(filterOptions(filingPeriods, optionDisplayMap))
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

  periodOptions.forEach(po => {
    const [yr, hasQtr] = splitYearQuarter(po)
    if(!optionDisplayMap[yr] && hasQtr) return 
    keepers.push(po)
  })

  return keepers
}
