jest.unmock('./requestSignature.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestSignature from '../../../src/filing/actions/requestSignature.js'

describe('requestSignature', () => {
  it('creates an action to signal a request for the signature', () => {
    expect(requestSignature()).toEqual({
      type: types.REQUEST_SIGNATURE,
    })
  })
})
