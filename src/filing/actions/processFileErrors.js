import receiveFileErrors from './receiveFileErrors.js'

export default function processFileErrors(errors, file) {
  return (dispatch, getState) => {
    const lei = getState().app.lei
    return dispatch(receiveFileErrors(lei, errors, file))
  }
}
