import receiveSubmission from './receiveSubmission.js'
import fetchNewSubmission from './fetchNewSubmission.js'
import hasHttpError from './hasHttpError.js'
import receiveError from './receiveError.js'
import requestSubmission from './requestSubmission.js'
import { getLatestSubmission } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchSubmission() {
  return (dispatch) => {
    dispatch(requestSubmission())
    return getLatestSubmission()
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (!hasError) return dispatch(receiveSubmission(json))

          if (json && json.status === 404) {
            return dispatch(fetchNewSubmission())
          }

          dispatch(receiveError(json))
          throw new Error(json && `${json.status}: ${json.statusText}`)
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
