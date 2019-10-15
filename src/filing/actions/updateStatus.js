import * as types from '../constants'

export default function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    status: status
  }
}
