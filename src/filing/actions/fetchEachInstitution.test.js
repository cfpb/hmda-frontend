jest.mock('../api/api')
jest.mock('./fetchCurrentFiling.js')
jest.unmock('./fetchEachInstitution.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchEachInstitution from './fetchEachInstitution.js'
import fetchCurrentFiling from './fetchCurrentFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getInstitution } from '../api/api.js'
import fs from 'fs'

const institutionsDetailObj = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions-detail.json')
)

getInstitution.mockImplementation(id =>
  Promise.resolve(institutionsDetailObj[id])
)
fetchCurrentFiling.mockImplementation(() => () => {
  return { type: 'fetchCurrentFiling' }
})

const mockStore = configureMockStore([thunk])

const getEachInstitution = [
  { type: types.REQUEST_INSTITUTION, id: '0' },
  { type: types.REQUEST_INSTITUTION, id: '1' },
  { type: types.REQUEST_INSTITUTION, id: '2' },
  { type: types.REQUEST_INSTITUTION, id: '3' },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['0'].institution
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['1'].institution
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['2'].institution
  },
  {
    type: types.RECEIVE_INSTITUTION,
    institution: institutionsDetailObj['3'].institution
  }
]
describe('fetchEachInstitution', () => {
  it('creates a thunk that will clear current filings and fetch each institution', done => {
    const store = mockStore({ app: { filingPeriod: '2017' } })

    store
      .dispatch(
        fetchEachInstitution([
          { id: '0' },
          { id: '1' },
          { id: '2' },
          { id: '3' }
        ])
      )
      .then(() => {
        expect(store.getActions()).toEqual([...getEachInstitution])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
