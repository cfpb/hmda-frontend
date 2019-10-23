import * as types from '../constants'

export default function receiveFileErrors(lei, errors, file) {
  return {
    type: types.RECEIVE_FILE_ERRORS,
    lei,
    errors,
    file
  }
}
