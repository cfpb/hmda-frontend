// @broken
jest.unmock('./requestFiling.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestFiling from '../../../src/filing/actions/requestFiling.js'

describe('requestFiling', () => {
  it('creates an action to signal a request for the relevant filing', () => {
    expect(requestFiling({ lei: '123' })).toEqual({
      type: types.REQUEST_FILING,
      lei: '123',
    })
  })
})
