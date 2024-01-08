import { getFiling } from '../api/api'
import { error } from '../utils/log.js'
import hasHttpError from './hasHttpError'
import receiveError from './receiveError'
import receiveFilingPage from './receiveFilingPage'

export default function fetchFilingPage(lei, page) {
  if (!lei) return

  return (dispatch, getState) => {
    const appState = getState().app
    const filingPeriod = appState.filingPeriod
    const alreadyFetched = appState.filings[lei].submissionPages[page]

    if (!filingPeriod || alreadyFetched) return

    // Fetch data, then update store
    return getFiling(lei, filingPeriod, page)
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }

          if (!hasError) dispatch(receiveFilingPage(json))
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
