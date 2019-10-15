jest.unmock('./requestEdits.js')
jest.unmock('../constants')
import * as types from '../constants'
import requestEdits from './requestEdits.js'

describe('requestEdits', () => {
  it('creates an action to signal a request for edits', () => {
    expect(requestEdits()).toEqual({
      type: types.REQUEST_EDITS
    })
  })
})
