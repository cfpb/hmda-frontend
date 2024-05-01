jest.mock('../api/api')
jest.unmock('./updateSignature.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import updateSignature from '../../../src/filing/actions/updateSignature.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { postSignature } from '../../../src/filing/api/api.js'

postSignature.mockImplementation((id) => Promise.resolve({ status: 10 }))
const mockStore = configureMockStore([thunk])

describe('updateSignature', () => {
  it('creates a thunk that will update a signature', (done) => {
    const store = mockStore({})

    store
      .dispatch(updateSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE_POST },
          {
            type: types.RECEIVE_SIGNATURE_POST,
            receipt: undefined,
            timestamp: undefined,
          },
          {
            type: types.UPDATE_STATUS,
            status: {},
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
    postSignature.mockImplementation(() =>
      Promise.resolve({ status: 404, statusText: 'argle' }),
    )

    store
      .dispatch(updateSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE_POST },
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
