import * as types from '../constants'

export default function showConfirm() {
  return {
    type: types.SHOW_CONFIRM,
    showing: true,
  }
}
