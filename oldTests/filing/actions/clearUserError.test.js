jest.unmock('../../../src/filing/actions/clearUserError.js')
jest.unmock('../../../src/filing/constants')
import * as types from '../../../src/filing/constants'
import clearUserError from '../../../src/filing/actions/clearUserError.js'

describe('clearUserError', () => {
  it('creates an action to signal that user errors should be cleared', () => {
    expect(clearUserError()).toEqual({
      type: types.CLEAR_USER_ERROR,
    })
  })
})
