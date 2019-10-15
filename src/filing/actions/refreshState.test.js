jest.unmock('./refreshState.js')
jest.unmock('../constants')
import * as types from '../constants'
import refreshState from './refreshState.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { lei: '123' } })

describe('refreshState', () => {
  it('creates a thunk to refresh the state', () => {
    expect(typeof refreshState()).toEqual('function')
  })

  it('dispatches an action when handed to dispatch', () => {
    store.dispatch(refreshState())
    expect(store.getActions()).toEqual([
      { type: types.REFRESH_STATE, lei: '123' }
    ])
  })
})
