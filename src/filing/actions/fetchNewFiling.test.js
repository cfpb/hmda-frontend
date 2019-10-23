jest.mock('../api/api')
jest.unmock('./fetchNewFiling.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchNewFiling from './fetchNewFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createFiling } from '../api/api.js'

const filingData = {'filing':{'period':'2018','lei':'BANK1','status':{'code':2,'message':'in-progress'},'filingRequired':true,'start':1541472204454,'end':0},'submissions':[]}
createFiling.mockImplementation(id =>
  Promise.resolve(filingData)
)

const mockStore = configureMockStore([thunk])

describe('fetchNewFiling', () => {
  it('creates a thunk that will send a request to create a new filing', done => {
    const store = mockStore({})

    store
      .dispatch(fetchNewFiling({lei:'a', period: 'b'}))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_FILING,
            id: 'a'
          },
          {
            type: types.RECEIVE_FILING,
            filing: filingData
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
  it('handles errors when introduced', done => {
    const store = mockStore({})
    console.error = jest.fn()

    createFiling.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchNewFiling({lei:'a', period: 'b'}))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_FILING,
            id: 'a'
          },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 404, statusText: 'argle' }
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
