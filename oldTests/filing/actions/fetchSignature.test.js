jest.mock('../../../src/filing/api/api')
jest.unmock('../../../src/filing/constants')
jest.unmock('../../../src/filing/actions/fetchSignature.js')
import * as types from '../../../src/filing/constants'
import fetchSignature from '../../../src/filing/actions/fetchSignature.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getSignature } from '../../../src/filing/api/api.js'

getSignature.mockImplementation((id) =>
  Promise.resolve({ timestamp: 1, receipt: 2, status: 3 }),
)
const mockStore = configureMockStore([thunk])

describe('fetchSignature', () => {
  it('creates a thunk that will fetch signature', (done) => {
    const store = mockStore({})

    store
      .dispatch(fetchSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE },
          {
            type: types.RECEIVE_SIGNATURE,
            timestamp: 1,
            receipt: 2,
          },
        ])
        done()
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })
  it('handles errors when introduced', (done) => {
    const store = mockStore({})
    console.error = jest.fn()
    getSignature.mockImplementation((id) =>
      Promise.resolve({ status: 404, statusText: 'argle' }),
    )

    store
      .dispatch(fetchSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 404, statusText: 'argle' },
          },
        ])
        done()
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })
})
