import hasHttpError from './hasHttpError'
import receiveError from './receiveError'
import receiveLatestSubmission from './receiveLatestSubmission'
import requestLatestSubmission from './requestLatestSubmission'
import { getLatestSubmission } from '../api/api'
import { error } from '../utils/log.js'

export default function fetchLatestSubmission(lei, filing) {
  return (dispatch) => {
    dispatch(requestLatestSubmission(lei))
    return getLatestSubmission(lei, filing)
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (!hasError) return dispatch(receiveLatestSubmission(json))
          if (json && json.status === 404)
            return dispatch(receiveLatestSubmission({ id: { lei } }))
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
