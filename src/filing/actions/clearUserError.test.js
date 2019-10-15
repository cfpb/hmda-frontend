jest.unmock('./clearUserError.js')
jest.unmock('../constants')
import * as types from '../constants'
import clearUserError from './clearUserError.js'

describe('clearUserError', () => {
  it('creates an action to signal that user errors should be cleared', () => {
    expect(clearUserError()).toEqual({
      type: types.CLEAR_USER_ERROR
    })
  })
})
