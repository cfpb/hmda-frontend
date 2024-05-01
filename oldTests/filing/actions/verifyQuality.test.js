jest.unmock('./verifyQuality.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import verifyQuality from '../../../src/filing/actions/verifyQuality.js'

describe('verifyQuality', () => {
  it('creates an action to signal quality has been verified', () => {
    expect(verifyQuality(true)).toEqual({
      type: types.VERIFY_QUALITY,
      checked: true,
      isFetching: false,
    })
  })
})
