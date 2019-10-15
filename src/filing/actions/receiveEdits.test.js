jest.unmock('./receiveEdits.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveEdits from './receiveEdits.js'

describe('receiveEdits', () => {
  it('creates an action to signal that edits have been acquired', () => {
    const data = { a: 1 }
    expect(receiveEdits(data)).toEqual({
      type: types.RECEIVE_EDITS,
      edits: data
    })
  })
})
