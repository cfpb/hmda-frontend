import updateStatus from './updateStatus.js'
import receiveSignaturePost from './receiveSignaturePost.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestSignaturePost from './requestSignaturePost.js'
import { postSignature } from '../api/api.js'
import { error } from '../utils/log.js'

export default function updateSignature(signed) {
  return dispatch => {
    dispatch(requestSignaturePost())
    return postSignature(signed)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          dispatch(receiveSignaturePost(json))
          return dispatch(
            updateStatus({
              ...json.status
            })
          )
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
