jest.unmock('./receiveError.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import receiveError from '../../../src/filing/actions/receiveError.js'

describe('receiveError', () => {
  it('creates an action to signal receiving an error', () => {
    expect(receiveError('b')).toEqual({
      type: types.RECEIVE_ERROR,
      error: 'b',
    })
  })

  it('creates an action to signal receiving an error when no error passed', () => {
    expect(receiveError()).toEqual({
      type: types.RECEIVE_ERROR,
      error: new Error('Unexpected error'),
    })
  })
})
