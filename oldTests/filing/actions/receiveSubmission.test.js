// @broken
jest.unmock('./receiveSubmission.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import receiveSubmission from '../../../src/filing/actions/receiveSubmission.js'

describe('receiveSubmission', () => {
  it('creates an action to signal current submission data has been received', () => {
    const data = {
      id: {
        sequenceNumber: 2,
      },
    }
    expect(receiveSubmission(data)).toEqual({
      type: types.RECEIVE_SUBMISSION,
      ...data,
    })
  })
})
