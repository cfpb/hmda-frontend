import * as types from '../constants'

export default function requestEdit(edit) {
  return {
    type: types.REQUEST_EDIT,
    edit: edit
  }
}
