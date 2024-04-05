jest.mock('../../../src/filing/api/api')
jest.mock('../../../src/filing/actions/receiveSubmission.j')
jest.mock('../../../src/filing/actions/fetchSubmission.js')
jest.unmock('../../../src/filing/actions/fetchNewSubmission.js')
jest.unmock('../../../src/filing/actions/hasHttpError.js')
jest.unmock('../../../src/filing/constants')

import * as types from '../../../src/filing/constants'
import fetchSubmission from '../../../src/filing/actions/fetchSubmission.js'
import { getLatestSubmission } from '../../../src/filing/api/api.js'
import receiveSubmission from '../../../src/filing/actions/receiveSubmission.js'
import fetchNewSubmission from '../../../src/filing/actions/fetchNewSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

fetchNewSubmission.mockImplementation((id, filing) => {
  return (dispatch) => {
    return { type: 'resolved' }
  }
})

receiveSubmission.mockImplementation((json) => {
  return { type: types.RECEIVE_SUBMISSION }
})

describe('fetchSubmission', () => {
  it('functions when receives 200', () => {
    const store = mockStore({})
    getLatestSubmission.mockImplementation(() =>
      Promise.resolve({
        id: {
          sequenceNumber: 1,
          lei: '123',
          period: '2017',
        },
      }),
    )

    store.dispatch(fetchSubmission()).then(() => {
      expect(receiveSubmission).toHaveBeenCalled()
      expect(receiveSubmission.mock.calls.length).toBe(1)
    })
  })

  it('requests new submission on 404', () => {
    const store = mockStore({})
    getLatestSubmission.mockImplementation(() =>
      Promise.resolve({
        status: 404,
        url: 'https://url.com/hmda/institutions/abc/filings/2017/submissions/latest',
      }),
    )

    store.dispatch(fetchSubmission()).then(() => {
      expect(fetchNewSubmission.mock.calls[0][0]).toBe('abc')
      expect(fetchNewSubmission.mock.calls[0][1]).toBe('2017')
      expect(receiveSubmission.mock.calls.length).toBe(1)
    })
  })

  it('throws on error other than 404', () => {
    delete console.error
    const err = jest.fn()
    console.error = err
    const store = mockStore({})
    getLatestSubmission.mockImplementation(() =>
      Promise.resolve({
        status: 500,
        statusText: 'uhoh',
      }),
    )

    store.dispatch(fetchSubmission()).then(() => {
      expect(receiveSubmission.mock.calls.length).toBe(1)
      expect(fetchNewSubmission.mock.calls.length).toBe(1)
      expect(err.mock.calls.length).toBe(1)
    })
  })
})
