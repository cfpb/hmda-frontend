import * as types from '../constants'

export default function suppressEdits() {
  return {
    type: types.SUPPRESS_EDITS,
  }
}
