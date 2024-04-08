import requestEdits from './requestEdits.js'
import hasHttpError from './hasHttpError.js'
import receiveError from './receiveError.js'
import receiveEdits from './receiveEdits.js'
import { getEdits } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchEdits() {
  return (dispatch) => {
    dispatch(requestEdits())
    return getEdits()
      .then((json) => {
        return hasHttpError(json).then((hasError) => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          dispatch(receiveEdits(json))
          return json
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
