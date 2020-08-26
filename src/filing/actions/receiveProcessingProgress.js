import * as types from '../constants'

export default function receiveProcessingProgress({ status }) {
  return (dispatch) => {
    return dispatch({
      type: types.RECEIVE_PROCESSING_PROGRESS,
      status
    })
  }
}