import { postUpload } from '../api/api.js'
import pollForProgress from './pollForProgress.js'
import updateStatus from './updateStatus.js'
import requestUpload from './requestUpload.js'
import receiveUpload from './receiveUpload.js'
import hasHttpError from './hasHttpError.js'
import receiveUploadError from './receiveUploadError.js'
import { error } from '../utils/log.js'

export default function fetchUpload(file) {
  return dispatch => {
    dispatch(requestUpload())

    const data = new FormData()
    data.append('file', file)

    return postUpload(data)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveUploadError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }

          dispatch(receiveUpload(json))
          dispatch(updateStatus(json.status))
          dispatch(pollForProgress())
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
