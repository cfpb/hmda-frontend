import * as types from '../constants'

export default function receiveSignaturePost(data) {
  return {
    type: types.RECEIVE_SIGNATURE_POST,
    timestamp: data.timestamp,
    receipt: data.receipt,
    email: data.email
  }
}
