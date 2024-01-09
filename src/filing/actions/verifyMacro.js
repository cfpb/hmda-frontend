import * as types from '../constants'

export default function verifyMacro(checked, lei) {
  return {
    type: types.VERIFY_MACRO,
    checked: checked,
    isFetching: false,
    lei,
  }
}
