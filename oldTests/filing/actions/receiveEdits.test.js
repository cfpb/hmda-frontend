jest.unmock('./receiveEdits.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import receiveEdits from '../../../src/filing/actions/receiveEdits.js'

describe('receiveEdits', () => {
  it('creates an action to signal that edits have been acquired', () => {
    const data = { a: 1 }
    expect(receiveEdits(data)).toEqual({
      type: types.RECEIVE_EDITS,
      edits: data,
    })
  })
})
