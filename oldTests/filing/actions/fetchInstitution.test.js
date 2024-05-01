jest.mock('../../../src/filing/api/api')
jest.unmock('../../../src/filing/constants')
jest.unmock('../../../src/filing/actions/fetchInstitution.js')
import * as types from '../../../src/filing/constants'
import fetchInstitution from '../../../src/filing/actions/fetchInstitution.js'
import fs from 'fs'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getInstitution } from '../../../src/filing/api/api.js'

const institutionsDetailObj = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions-detail.json'),
)
getInstitution.mockImplementation((id) =>
  Promise.resolve(institutionsDetailObj[id]),
)
const mockStore = configureMockStore([thunk])

describe('fetchInstitution', () => {
  it('creates a thunk that will send an http request for an institution by id', (done) => {
    const store = mockStore({ filings: [] })

    store
      .dispatch(fetchInstitution({ id: '0' }, 2018, false))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_INSTITUTION, id: '0' },
          {
            type: types.RECEIVE_INSTITUTION,
            institution: {
              id: '0',
              name: 'Bank 0',
              status: 'active',
            },
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
    getInstitution.mockImplementation((id) =>
      Promise.resolve({ status: 404, statusText: 'argle' }),
    )

    store
      .dispatch(fetchInstitution({ id: '123' }, 2018))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_INSTITUTION, id: '123' },
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
