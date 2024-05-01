jest.unmock('./requestCSV.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestCSV from '../../../src/filing/actions/requestCSV.js'

describe('requestCSV', () => {
  it('creates an action to signal a request for a CSV', () => {
    expect(requestCSV()).toEqual({
      type: types.REQUEST_CSV,
    })
  })
})
