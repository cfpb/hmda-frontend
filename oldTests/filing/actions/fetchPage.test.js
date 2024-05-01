jest.mock('../../../src/filing/api/fetch')
jest.unmock('../../../src/filing/constants')
jest.unmock('../../../src/filing/actions/fetchPage.js')
import * as types from '../../../src/filing/constants'
import fetchPage from '../../../src/filing/actions/fetchPage.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetch } from '../../../src/filing/api/fetch.js'

fetch.mockImplementation((pathObj) => Promise.resolve({ bargle: 'foo' }))
const mockStore = configureMockStore([thunk])

const emptyParseErrors = {
  type: types.RECEIVE_PARSE_ERRORS,
  larErrors: undefined,
  transmittalSheetErrors: undefined,
  pagination: {
    count: undefined,
    total: undefined,
    _links: undefined,
  },
}

describe('fetchPage', () => {
  it('creates a thunk that will fetch a page by pathname and select sub actions', (done) => {
    const store = mockStore({})

    store
      .dispatch(fetchPage('parseErrors', '/argle'))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_PARSE_ERRORS },
          emptyParseErrors,
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
    fetch.mockImplementation((id) =>
      Promise.resolve({ status: 404, statusText: 'argle' }),
    )

    store
      .dispatch(fetchPage('parseErrors', '/argle'))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_PARSE_ERRORS },
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
