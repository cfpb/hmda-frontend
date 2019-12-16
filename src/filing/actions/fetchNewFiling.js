import receiveFiling from './receiveFiling.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestFiling from './requestFiling.js'
import { createFiling } from '../api/api.js'
import { error } from '../utils/log.js'
import fetchNewLatestSubmission from './fetchNewLatestSubmission'

export default function fetchNewFiling(filing) {
  return dispatch => {
    dispatch(requestFiling(filing))
    return createFiling(filing.lei, filing.period)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          if (!hasError) {
            dispatch(receiveFiling(json))
            return dispatch(fetchNewLatestSubmission(filing.lei, filing.period))
          }
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
