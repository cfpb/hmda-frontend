import * as types from '../constants'

export default function receiveInstitution(data) {
  return {
    type: types.RECEIVE_INSTITUTION,
    institution: data.institution
  }
}
