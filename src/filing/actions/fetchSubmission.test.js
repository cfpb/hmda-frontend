jest.mock('../api/api.js')
jest.mock('./receiveSubmission.js')
jest.mock('./fetchNewSubmission.js')
jest.unmock('./fetchSubmission.js')
jest.unmock('./hasHttpError.js')
jest.unmock('../constants')

import * as types from '../constants'
import fetchSubmission from './fetchSubmission.js'
import { getLatestSubmission } from '../api/api.js'
import receiveSubmission from './receiveSubmission.js'
import fetchNewSubmission from './fetchNewSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

fetchNewSubmission.mockImplementation((id, filing) => {
  return dispatch => {
    return { type: 'resolved' }
  }
})

receiveSubmission.mockImplementation(json => {
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
          period: '2017'
        }
      })
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
        url:
          'https://url.com/hmda/institutions/abc/filings/2017/submissions/latest'
      })
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
        statusText: 'uhoh'
      })
    )

    store.dispatch(fetchSubmission()).then(() => {
      expect(receiveSubmission.mock.calls.length).toBe(1)
      expect(fetchNewSubmission.mock.calls.length).toBe(1)
      expect(err.mock.calls.length).toBe(1)
    })
  })
})
