jest.mock('../../../src/filing/api/api')
jest.unmock('../../../src/filing/constants')
jest.unmock('../../../src/filing/actions/fetchUpload.js')
import * as types from '../../../src/filing/constants'
import fetchUpload from '../../../src/filing/actions/fetchUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { postUpload } from '../../../src/filing/api/api.js'

postUpload.mockImplementation((id) => Promise.resolve({ status: 'cool' }))
const mockStore = configureMockStore([thunk])

describe('fetchUpload', () => {
  it('creates a thunk that will fetch upload', (done) => {
    const store = mockStore({ app: { lei: '123' } })

    store
      .dispatch(fetchUpload({ aFile: 'f' }))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_UPLOAD, id: '123' },
          {
            type: types.RECEIVE_UPLOAD,
            id: '123',
          },
          {
            type: types.UPDATE_STATUS,
            status: 'cool',
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
    const store = mockStore({ app: { lei: '123' } })
    console.error = jest.fn()
    postUpload.mockImplementation((id) =>
      Promise.resolve({ status: 404, statusText: 'argle' }),
    )

    store
      .dispatch(fetchUpload({}))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_UPLOAD, id: '123' },
          {
            type: types.RECEIVE_UPLOAD_ERROR,
            id: '123',
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
