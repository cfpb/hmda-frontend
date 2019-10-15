import receiveSignature from './receiveSignature.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestSignature from './requestSignature.js'
import { getSignature } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchSignature() {
  return dispatch => {
    dispatch(requestSignature())
    return getSignature()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          dispatch(receiveSignature(json))
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
