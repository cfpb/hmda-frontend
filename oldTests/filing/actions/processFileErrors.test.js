jest.unmock('./processFileErrors.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import processFileErrors from '../../../src/filing/actions/processFileErrors.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { lei: '123' } })

describe('processFileErrors', () => {
  it('creates a thunk to signal processing of file errors', () => {
    expect(typeof processFileErrors()).toEqual('function')
  })

  it('creates an action to signal file processing when dispatched', () => {
    const errors = ['qwe']
    store.dispatch(processFileErrors(errors, 'afile'))
    expect(store.getActions()).toEqual([
      { type: types.RECEIVE_FILE_ERRORS, errors, file: 'afile', lei: '123' },
    ])
  })
})
