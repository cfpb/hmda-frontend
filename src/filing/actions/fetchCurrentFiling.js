import fetchFiling from './fetchFiling.js'
import fetchNewFiling from './fetchNewFiling.js'

export default function fetchCurrentFiling(institution) {
  return (dispatch, getState) => {
    const period = getState().app.filingPeriod

    const filing = institution.filings.filter(filing => {
      return filing.period === period
    })[0]

    if (filing) return dispatch(fetchFiling(filing))

    return dispatch(
      fetchNewFiling({
        lei: institution.institution.lei,
        period: period
      })
    )
  }
}
