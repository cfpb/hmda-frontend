import * as types from '../constants'

export default function receiveError(error) {
  return {
    type: types.RECEIVE_ERROR,
    error: error || new Error('Unexpected error')
  }
}
