import * as STATUS from '../constants/statusCodes.js'
import selectFile from '../actions/selectFile.js'
import selectNewFile from '../actions/selectNewFile.js'
import showConfirm from '../actions/showConfirm.js'
import fetchUpload from '../actions/fetchUpload.js'
import processFileErrors from '../actions/processFileErrors.js'
import checkFileErrors from '../utils/checkFileErrors.js'

export default function handleFile(file, code, error) {
  return dispatch => {
    const fileErrors = checkFileErrors(file)

    if (fileErrors.length)
      return dispatch(processFileErrors(fileErrors, file.name))

    if (code >= STATUS.UPLOADING || error) {
      dispatch(showConfirm())
      dispatch(selectNewFile(file))
    } else {
      dispatch(selectFile(file))
      dispatch(fetchUpload(file))
    }
  }
}
