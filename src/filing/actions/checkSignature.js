import * as types from '../constants'

export default function checkSignature(checked) {
  return {
    type: types.CHECK_SIGNATURE,
    checked: checked
  }
}
