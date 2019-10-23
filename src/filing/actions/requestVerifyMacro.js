import * as types from '../constants'

export default function requestVerifyMacro() {
  return {
    type: types.REQUEST_VERIFY_MACRO,
    isFetching: true
  }
}
