jest.unmock('./requestSignature.js')
jest.unmock('../constants')
import * as types from '../constants'
import requestSignature from './requestSignature.js'

describe('requestSignature', () => {
  it('creates an action to signal a request for the signature', () => {
    expect(requestSignature()).toEqual({
      type: types.REQUEST_SIGNATURE
    })
  })
})
