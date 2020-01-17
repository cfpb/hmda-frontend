import fetchFiling from './fetchFiling.js'
import fetchNewFiling from './fetchNewFiling.js'
import { splitYearQuarter } from '../api/utils.js'
import { afterFilingPeriod } from '../utils/date'
import receiveNonQFiling from './receiveNonQFiling'

export default function fetchCurrentFiling(institution) {
  return (dispatch, getState) => {
    const period = getState().app.filingPeriod
    const isQuarterly = splitYearQuarter(period)[1]
    const filing = institution.filings.filter(filing => {
      return filing.period === period
    })[0]

    if (filing) return dispatch(fetchFiling(filing))

    // Avoid creating Filings for passed Quarters
    if (isQuarterly && afterFilingPeriod(period))
      return dispatch(receiveNonQFiling(institution))
    
    return dispatch(
      fetchNewFiling({
        lei: institution.institution.lei,
        period: period
      })
    )
  }
}
