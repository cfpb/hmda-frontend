import fetchNewFiling from './fetchNewFiling.js'
import receiveFiling from './receiveFiling.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestFiling from './requestFiling.js'
import { getFiling } from '../api/api.js'
import { error } from '../utils/log.js'
import fetchLatestSubmission from './fetchLatestSubmission'
import receiveNonQFiling from './receiveNonQFiling'

export default function fetchFiling(filing, selectedPeriod) {
  return (dispatch) => {
    dispatch(requestFiling(filing))
    return getFiling(filing.lei, filing.period)
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (!hasError) {
            dispatch(receiveFiling(json))
            return dispatch(fetchLatestSubmission(filing.lei, filing.period))
          }

          if (json && json.status === 404) {
            // Avoid creating Filings for closed filing periods
            return selectedPeriod.isClosed
              ? dispatch(
                  receiveNonQFiling({ institution: { lei: filing.lei } }),
                )
              : dispatch(fetchNewFiling(filing))
          }

          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
