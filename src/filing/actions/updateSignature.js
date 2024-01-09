import updateStatus from './updateStatus.js'
import receiveSignaturePost from './receiveSignaturePost.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestSignaturePost from './requestSignaturePost.js'
import { postSignature } from '../api/api.js'
import { error } from '../utils/log.js'

const MAX_SIGNING_ATTEMPTS = 10

export default function updateSignature(signed, lei, attempts = 0) {
  return (dispatch) => {
    if (!attempts) dispatch(requestSignaturePost())
    return postSignature(signed)
      .then((json) => {
        // Temp fix for an inconsistent 405 error from signing endpoint.
        // Attempt signing up to 10 times before throwing an error.
        if (json.status === 405 && attempts < MAX_SIGNING_ATTEMPTS)
          return dispatch(updateSignature(signed, lei, attempts + 1))

        return hasHttpError(json).then((hasError) => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          dispatch(receiveSignaturePost(json))
          return dispatch(
            updateStatus(
              {
                ...json.status,
              },
              lei,
            ),
          )
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
