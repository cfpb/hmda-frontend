import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestSubmission from './requestSubmission.js'
import { createSubmission } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchNewSubmission() {
  return (dispatch, getState) => {
    const appState = getState().app
    const lei = appState.lei
    const filing = appState.filingPeriod

    localStorage.removeItem(`HMDA_FILE_SIZE/${filing}/${lei}`)
    localStorage.removeItem(`HMDA_FILE_PROGRESS/${filing}/${lei}`)

    dispatch(requestSubmission())
    return createSubmission(lei, filing)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSubmission(json))
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
