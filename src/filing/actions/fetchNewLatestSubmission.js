import { createSubmission } from '../api/api.js'
import { error } from '../utils/log.js'
import hasHttpError from './hasHttpError.js'
import receiveError from './receiveError.js'
import receiveLatestSubmission from './receiveLatestSubmission.js'
import requestLatestSubmission from './requestLatestSubmission.js'

export default function fetchNewLatestSubmission(lei, filing) {
  return (dispatch, getState) => {
    localStorage.removeItem(`HMDA_FILE_SIZE/${filing}/${lei}`)
    localStorage.removeItem(`HMDA_FILE_PROGRESS/${filing}/${lei}`)

    dispatch(requestLatestSubmission(lei))
    return createSubmission(lei, filing)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveLatestSubmission(json))
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
