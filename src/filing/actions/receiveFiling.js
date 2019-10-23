import * as types from '../constants'

export default function receiveFiling(data) {
  return {
    type: types.RECEIVE_FILING,
    filing: data
  }
}
