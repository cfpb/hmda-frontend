jest.unmock('./requestSubmission.js')
jest.unmock('../constants')
import * as types from '../constants'
import requestSubmission from './requestSubmission.js'

describe('requestSubmission', () => {
  it('creates an action to signal a request for submission', () => {
    expect(requestSubmission()).toEqual({
      type: types.REQUEST_SUBMISSION
    })
  })
})
