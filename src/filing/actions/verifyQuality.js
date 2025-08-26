import * as types from '../constants'

export default function verifyQuality(checked, lei) {
  return {
    type: types.VERIFY_QUALITY,
    checked,
    isFetching: false,
    lei,
  }
}
