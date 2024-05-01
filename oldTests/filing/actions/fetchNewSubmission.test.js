jest.mock('../../../src/filing/api/api')
jest.unmock('../../../src/filing/constants')
jest.unmock('../../../src/filing/actions/fetchNewSubmission.js')
import * as types from '../../../src/filing/constants'
import fetchNewSubmission from '../../../src/filing/actions/fetchNewSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createSubmission } from '../../../src/filing/api/api.js'

createSubmission.mockImplementation((id) =>
  Promise.resolve({ id: { sequenceNumber: 4 } }),
)
const mockStore = configureMockStore([thunk])

describe('fetchNewSubmission', () => {
  it('creates a thunk that will fetch summary', (done) => {
    const store = mockStore({
      app: { lei: '1', filingPeriod: '2017' },
    })
    const remove = jest.fn()
    delete window.localStorage
    window.localStorage = { removeItem: remove }

    store
      .dispatch(fetchNewSubmission())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SUBMISSION },
          {
            type: types.RECEIVE_SUBMISSION,
            id: { sequenceNumber: 4 },
          },
        ])
        expect(remove.mock.calls.length).toBe(2)
        done()
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })
  it('handles errors when introduced', (done) => {
    const store = mockStore({
      app: { lei: '1', filingPeriod: '2017' },
    })
    console.error = jest.fn()
    const remove = jest.fn()
    delete window.localStorage
    window.localStorage = { removeItem: remove }

    createSubmission.mockImplementation((id) =>
      Promise.resolve({ status: 404, statusText: 'argle' }),
    )

    store
      .dispatch(fetchNewSubmission())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SUBMISSION },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 404, statusText: 'argle' },
          },
        ])
        expect(remove.mock.calls.length).toBe(2)
        done()
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })
})
