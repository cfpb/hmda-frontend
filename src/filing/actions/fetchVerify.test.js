jest.mock('../api/api')
jest.unmock('./fetchVerify.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchVerify from './fetchVerify.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { postVerify } from '../api/api.js'

postVerify.mockImplementation(() =>
  Promise.resolve({
    verified: true,
    status: { code: 8, message: 'postverify' }
  })
)
const mockStore = configureMockStore([thunk])

describe('fetchVerify', () => {
  it('creates a thunk that will post to the quality endpoint', done => {
    const store = mockStore({})
    store
      .dispatch(fetchVerify('quality', true))
      .then(() => {
        expect(store.getActions()).toEqual([
          { isFetching: true, type: types.REQUEST_VERIFY_QUALITY },
          { type: types.VERIFY_QUALITY, checked: true, isFetching: false },
          {
            type: types.UPDATE_STATUS,
            status: { code: 8, message: 'postverify' }
          }
        ])
        done()
      })
      .catch(e => {
        done.fail(e)
      })
  })

  it('creates a thunk that will post to the macro endpoint', done => {
    const store = mockStore({})
    store
      .dispatch(fetchVerify('macro', true))
      .then(() => {
        expect(store.getActions()).toEqual([
          { isFetching: true, type: types.REQUEST_VERIFY_MACRO },
          { type: types.VERIFY_MACRO, checked: true, isFetching: false },
          {
            type: types.UPDATE_STATUS,
            status: { code: 8, message: 'postverify' }
          }
        ])
        done()
      })
      .catch(e => {
        done.fail(e)
      })
  })
  it('handles errors when introduced', done => {
    const store = mockStore({})
    console.error = jest.fn()
    postVerify.mockImplementation(() =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchVerify())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_VERIFY_MACRO, isFetching: true },
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
