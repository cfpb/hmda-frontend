import * as types from '../constants'

export default function updateStatus(status, lei) {
  return {
    type: types.UPDATE_STATUS,
    status: status,
    lei,
  }
}
