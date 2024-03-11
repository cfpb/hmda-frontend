import * as types from '../constants'

export default function requestUpload() {
  return (dispatch, getState) => {
    return dispatch({
      type: types.REQUEST_UPLOAD,
      lei: getState().app.lei,
    })
  }
}
