import * as types from '../constants'

export default function receiveSignature(data) {
  return {
    type: types.RECEIVE_SIGNATURE,
    timestamp: data.timestamp,
    receipt: data.receipt,
    email: data.email
  }
}
