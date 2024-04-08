import * as types from '../constants'

export default function selectNewFile(file) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.SELECT_NEW_FILE,
      file,
      lei: getState().app.lei,
    })
  }
}
