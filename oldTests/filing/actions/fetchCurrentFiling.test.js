jest.unmock('../../../src/filing/constants')
jest.mock('../../../src/filing/api/api')
import fetchCurrentFiling from '../../../src/filing/actions/fetchCurrentFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getFiling } from '../../../src/filing/api/api.js'

const mockStore = configureMockStore([thunk])
getFiling.mockImplementation((id) => Promise.resolve({ filing: 'afiling' }))

const filings = [
  {
    period: '2016',
    lei: '123',
  },
  { period: '2017', lei: '123' },
]

describe('fetchCurrentFiling', () => {
  it('fetches edits', (done) => {
    const store = mockStore({ app: { filingPeriod: '2017' } })

    store.dispatch(fetchCurrentFiling(filings)).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: 'REQUEST_FILING', id: '123' },
          { type: 'RECEIVE_FILING', filing: { filing: 'afiling' } },
        ])
        done()
      }, 0)
    })
  })
})
