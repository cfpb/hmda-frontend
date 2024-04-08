import { postUpload } from '../api/api.js'
import pollForProgress from './pollForProgress.js'
import updateStatus from './updateStatus.js'
import requestUpload from './requestUpload.js'
import receiveUpload from './receiveUpload.js'
import hasHttpError from './hasHttpError.js'
import receiveUploadError from './receiveUploadError.js'
import { error } from '../utils/log.js'

export default function fetchUpload(file) {
  return (dispatch) => {
    dispatch(requestUpload())

    const data = new FormData()
    data.append('file', file)

    return postUpload(data)
      .then((response) => {
        return hasHttpError(response).then((hasError) => {
          if (hasError) {
            if (response instanceof Response) {
              /**
               * A Response object may contain a JSON payload with additional
               * details about the error. If no JSON details are found, we
               * fall back to using the Response's values.
               */
              response.json().then((json) => {
                const errorJson = {
                  status: (json && json.httpStatus) || response.status,
                  statusText: (json && json.message) || response.statusText,
                }
                dispatch(receiveUploadError(errorJson))
              })
            } else {
              dispatch(receiveUploadError(response))
            }

            throw new Error(
              response && `${response.status}: ${response.statusText}`,
            )
          }

          dispatch(receiveUpload(response))
          dispatch(updateStatus(response.status))
          dispatch(pollForProgress())
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
