jest.unmock('./requestEdits.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestEdits from '../../../src/filing/actions/requestEdits.js'

describe('requestEdits', () => {
  it('creates an action to signal a request for edits', () => {
    expect(requestEdits()).toEqual({
      type: types.REQUEST_EDITS,
    })
  })
})
