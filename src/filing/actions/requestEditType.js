import * as types from '../constants'

export default function requestEditType(editType) {
  return {
    type: types.REQUEST_EDIT_TYPE,
    editType
  }
}
