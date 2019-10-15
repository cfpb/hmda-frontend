jest.unmock('./checkSignature.js')
jest.unmock('../constants')
import * as types from '../constants'
import checkSignature from './checkSignature.js'

describe('checkSignature', () => {
  it('creates an action to signal a signature checkbox', () => {
    expect(checkSignature(true)).toEqual({
      type: types.CHECK_SIGNATURE,
      checked: true
    })
  })
})
