jest.unmock('./receiveEdit.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveEdit from './receiveEdit.js'

describe('receiveEdit', () => {
  it('creates an action to signal that an edit has been acquired', () => {
    const data = {
      edit: 'a',
      rows: 'b',
      count: 1,
      total: 2,
      _links: 'c'
    }

    expect(receiveEdit(data)).toEqual({
      type: types.RECEIVE_EDIT,
      edit: 'a',
      rows: 'b',
      pagination: {
        count: 1,
        total: 2,
        _links: 'c'
      }
    })
  })
})
