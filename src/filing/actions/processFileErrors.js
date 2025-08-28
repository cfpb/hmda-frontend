import receiveFileErrors from './receiveFileErrors.js'

export default function processFileErrors(errors, file) {
  return (dispatch, getState) => {
    const { lei } = getState().app
    return dispatch(receiveFileErrors(lei, errors, file))
  }
}
