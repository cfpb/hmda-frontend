import fetchFiling from './fetchFiling.js'
import fetchNewFiling from './fetchNewFiling.js'
import receiveNonQFiling from './receiveNonQFiling'

export default function fetchCurrentFiling(institution, selectedPeriod) {
  return (dispatch, getState) => {
    const period = getState().app.filingPeriod
    const filing = institution.filings.filter((filing) => {
      return filing.period === period
    })[0]

    if (filing) return dispatch(fetchFiling(filing, selectedPeriod))

    // Avoid creating Filings for closed filing periods
    if (selectedPeriod.isClosed) return dispatch(receiveNonQFiling(institution))

    return dispatch(
      fetchNewFiling({
        lei: institution.institution.lei,
        period: period,
      }),
    )
  }
}
