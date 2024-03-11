import * as types from '../constants'

export default function clearUserError() {
  return {
    type: types.CLEAR_USER_ERROR,
  }
}
