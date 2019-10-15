import * as types from '../constants'

export default function receiveUpload(data) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.RECEIVE_UPLOAD,
      lei: getState().app.lei
    })
  }
}
