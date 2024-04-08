import * as types from '../constants'

export default function requestVerifyQuality() {
  return {
    type: types.REQUEST_VERIFY_QUALITY,
    isFetching: true,
  }
}
