import * as types from '../constants'

export default function hideConfirm() {
  return {
    type: types.HIDE_CONFIRM,
    showing: false
  }
}
