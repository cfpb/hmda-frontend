jest.unmock('./verifyMacro.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants/index.js'
import verifyMacro from '../../../src/filing/actions/verifyMacro.js'

describe('verifyMacro', () => {
  it('creates an action to signal macro has been verified', () => {
    expect(verifyMacro(true)).toEqual({
      type: types.VERIFY_MACRO,
      checked: true,
      isFetching: false,
    })
  })
})
