jest.unmock('./verifyMacro.js')
jest.unmock('../constants')
import * as types from '../constants/index.js'
import verifyMacro from './verifyMacro.js'

describe('verifyMacro', () => {
  it('creates an action to signal macro has been verified', () => {
    expect(verifyMacro(true)).toEqual({
      type: types.VERIFY_MACRO,
      checked: true,
      isFetching: false
    })
  })
})
