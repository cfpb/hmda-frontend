import * as types from '../constants'

export default function requestInstitution(lei) {
  return {
    type: types.REQUEST_INSTITUTION,
    lei,
  }
}
