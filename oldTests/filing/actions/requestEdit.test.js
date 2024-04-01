jest.unmock('./requestEdit.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestEdit from '../../../src/filing/actions/requestEdit.js'

describe('requestEdit', () => {
  it('creates an action to signal a request for an edit', () => {
    expect(requestEdit()).toEqual({
      type: types.REQUEST_EDIT,
    })
  })
})
