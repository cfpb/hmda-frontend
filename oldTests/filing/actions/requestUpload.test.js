jest.unmock('./requestUpload.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestUpload from '../../../src/filing/actions/requestUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { lei: '123' } })

describe('uploadStart', () => {
  it('creates a thunk to signal the start of the file upload', () => {
    expect(typeof requestUpload()).toEqual('function')
  })

  it('creates an action to signal the start of the fule upload when dispatched', () => {
    store.dispatch(requestUpload())
    expect(store.getActions()).toEqual([
      { type: types.REQUEST_UPLOAD, lei: '123' },
    ])
  })
})
