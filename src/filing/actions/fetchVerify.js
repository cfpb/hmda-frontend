import updateStatus from './updateStatus.js'
import requestVerifyMacro from './requestVerifyMacro.js'
import requestVerifyQuality from './requestVerifyQuality.js'
import verifyMacro from './verifyMacro.js'
import verifyQuality from './verifyQuality.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { postVerify } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchVerify(type, checked) {
  return dispatch => {
    if (type === 'quality') dispatch(requestVerifyQuality())
    else dispatch(requestVerifyMacro())

    return postVerify(type, checked)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }

          if (type === 'quality') dispatch(verifyQuality(json.verified))
          else dispatch(verifyMacro(json.verified))

          return dispatch(updateStatus(json.status))
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
