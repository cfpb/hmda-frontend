jest.mock('../../../src/filing/api/api')
jest.unmock('../../../src/filing/actions/fetchCSV.js')
jest.unmock('../../../src/filing/constants')
jest.mock('file-saver')
import * as types from '../../../src/filing/constants/index.js'
import fetchCSV from '../../../src/filing/actions/fetchCSV.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getCSV } from '../../../src/filing/api/api.js'

getCSV.mockImplementation((id) => Promise.resolve('a,b,c'))
const mockStore = configureMockStore([thunk])

delete window.Blob
window.Blob = jest.fn(() => {})

describe('fetchCSV', () => {
  it('creates a thunk that will request edits and trigger a csv download', (done) => {
    const store = mockStore({})

    store
      .dispatch(fetchCSV())
      .then(() => {
        setTimeout(() => {
          expect(store.getActions()).toEqual([{ type: types.REQUEST_CSV }])
          expect(window.Blob.mock.calls.length).toBe(1)
          done()
        }, 0)
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will request edits and trigger a csv download when IE is detected', (done) => {
    const store = mockStore({})

    window.navigator.__defineGetter__('userAgent', () => 'MSIE ')

    store
      .dispatch(fetchCSV())
      .then(() => {
        expect(store.getActions()).toEqual([{ type: types.REQUEST_CSV }])
        expect(window.Blob.mock.calls.length).toBe(2)
        done()
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })
})

it('creates a thunk that manages an error during csv downloads', (done) => {
  const store = mockStore({})
  console.error = jest.fn()
  getCSV.mockImplementation((id) =>
    Promise.resolve({ status: 403, statusText: 'nope' }),
  )
  store
    .dispatch(fetchCSV())
    .then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_CSV },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 403, statusText: 'nope' },
          },
        ])
        expect(window.Blob.mock.calls.length).toBe(2)
        done()
      }, 0)
    })
    .catch((err) => {
      console.log(err)
      done.fail()
    })
})
