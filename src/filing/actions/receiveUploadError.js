import * as types from '../constants'

export default function receiveUploadError(error) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.RECEIVE_UPLOAD_ERROR,
      error: error || new Error('Unexpected upload error'),
      lei: getState().app.lei,
    })
  }
}
