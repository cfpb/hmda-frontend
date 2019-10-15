import * as types from '../constants'

export default function receiveSubmission(data) {

  return {
    type: types.RECEIVE_SUBMISSION,
    ...data
  }
}
