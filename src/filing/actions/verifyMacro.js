import * as types from '../constants'

export default function verifyMacro(checked) {
  return {
    type: types.VERIFY_MACRO,
    checked: checked,
    isFetching: false
  }
}
