jest.unmock('../../../src/filing/actions/checkSignature.js')
jest.unmock('../../../src/filing/constants')
import * as types from '../../../src/filing/constants'
import checkSignature from '../../../src/filing/actions/checkSignature.js'

describe('checkSignature', () => {
  it('creates an action to signal a signature checkbox', () => {
    expect(checkSignature(true)).toEqual({
      type: types.CHECK_SIGNATURE,
      checked: true,
    })
  })
})
