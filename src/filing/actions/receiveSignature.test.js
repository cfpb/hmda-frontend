jest.unmock('./receiveSignature.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveSignature from './receiveSignature.js'
import fs from 'fs'

const signatureObj = JSON.parse(
  fs.readFileSync('./test-resources/json/receipt.json')
)

describe('receiveSignature', () => {
  it('creates an action to signal the signature data has been acquired', () => {
    const data = signatureObj
    expect(receiveSignature(data)).toEqual({
      type: types.RECEIVE_SIGNATURE,
      timestamp: data.timestamp,
      receipt: data.receipt
    })
  })
})
