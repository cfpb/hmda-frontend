jest.unmock('./receiveUpload.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import receiveUpload from '../../../src/filing/actions/receiveUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { lei: '123' } })

describe('uploadComplete', () => {
  it('creates a thunk to signal upload completion', () => {
    expect(typeof receiveUpload()).toEqual('function')
  })

  it('creates an action to signal upload completion when dispatched', () => {
    store.dispatch(receiveUpload())
    expect(store.getActions()).toEqual([
      { type: types.RECEIVE_UPLOAD, lei: '123' },
    ])
  })
})
