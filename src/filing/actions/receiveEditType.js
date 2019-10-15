import * as types from '../constants'

export default function receiveEditType(editType) {
  return {
    type: types.RECEIVE_EDIT_TYPE,
    editType
  }
}
