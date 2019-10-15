jest.unmock('./verifyQuality.js')
jest.unmock('../constants')
import * as types from '../constants'
import verifyQuality from './verifyQuality.js'

describe('verifyQuality', () => {
  it('creates an action to signal quality has been verified', () => {
    expect(verifyQuality(true)).toEqual({
      type: types.VERIFY_QUALITY,
      checked: true,
      isFetching: false
    })
  })
})
