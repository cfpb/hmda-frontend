jest.unmock('./fetchEditType.js')
jest.unmock('../constants')
jest.mock('../api/api')
import * as types from '../constants'
import fetchEditType from './fetchEditType.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getEdit } from '../api/api.js'

const mockStore = configureMockStore([thunk])
getEdit.mockImplementation(id => Promise.resolve({ edit: 'anedit' }))

const editTypes = {
  syntactical: { edits: [{ edit: { edit: 1 } }] },
  validity: { edits: [] },
  quality: { edits: [{ edit: { edit: 2 } }], verified: false },
  macro: { edits: [], verified: false }
}

describe('fetchEditType', () => {
  it('fetches edits', done => {
    const store = mockStore({ app: { edits: { types: editTypes } } })

    store.dispatch(fetchEditType('syntactical')).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: 'REQUEST_EDIT_TYPE', editType: 'syntactical' },
          { type: 'REQUEST_EDIT', edit: { edit: 1 } },
          {
            type: 'RECEIVE_EDIT',
            edit: 'anedit',
            rows: undefined,
            pagination: {
              count: undefined,
              total: undefined,
              _links: undefined
            }
          },
          { type: 'RECEIVE_EDIT_TYPE', editType: 'syntactical' }
        ])
        done()
      }, 0)
    })
  })

  it('suppresses when given errors on edit fetch', done => {
    const store = mockStore({ app: { edits: { types: editTypes } } })

    getEdit.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'nah' })
    )

    console.error = jest.fn()

    store.dispatch(fetchEditType('syntactical')).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: 'REQUEST_EDIT_TYPE', editType: 'syntactical' },
          { type: 'REQUEST_EDIT', edit: { edit: 1 } },
          {
            type: 'SUPPRESS_EDITS'
          },
          { type: 'RECEIVE_EDIT_TYPE', editType: 'syntactical' }
        ])
        done()
      }, 0)
    })
  })

  it('does not make subrequests on types without edits', () => {
    const store = mockStore({ app: { edits: { types: editTypes } } })

    store.dispatch(fetchEditType('validity')).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'REQUEST_EDIT_TYPE', editType: 'validity' },
        { type: 'RECEIVE_EDIT_TYPE', editType: 'validity' }
      ])
    })
  })
})
