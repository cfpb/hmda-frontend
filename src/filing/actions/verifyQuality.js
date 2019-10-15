import * as types from '../constants'

export default function verifyQuality(checked) {
  return {
    type: types.VERIFY_QUALITY,
    checked: checked,
    isFetching: false
  }
}
