import * as types from '../constants'

export default function refreshState() {
  return (dispatch, getState) => {
    const lei = getState().app.lei
    return dispatch({
      type: types.REFRESH_STATE,
      lei,
    })
  }
}
