jest.unmock('./requestSummary.js')
jest.unmock('../constants')
import * as types from '../constants'
import requestSummary from './requestSummary.js'

describe('requestSummary', () => {
  it('creates an action to signal a request for the summary', () => {
    expect(requestSummary()).toEqual({
      type: types.REQUEST_SUMMARY
    })
  })
})
