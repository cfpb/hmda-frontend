import hasHttpError from '../actions/hasHttpError'
import receiveError from '../actions/receiveError'
import receiveLatestSubmission from './receiveLatestSubmission'
import requestLatestSubmission from '../actions/requestLatestSubmission'
import { getNewestSubmission } from '../api/api'
import { error } from '../utils/log.js'

export default function fetchLatestSubmission(lei, filing) {
  return dispatch => {
    dispatch(requestLatestSubmission(lei))
    return getNewestSubmission(lei, filing)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (!hasError) return dispatch(receiveLatestSubmission(json))
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
