jest.mock('../utils/checkFileErrors.js')
jest.mock('./processFileErrors.js')
jest.mock('./fetchUpload.js')
jest.unmock('./handleFile.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import handleFile from '../../../src/filing/actions/handleFile.js'
import checkFileErrors from '../../../src/filing/utils/checkFileErrors.js'
import processFileErrors from '../../../src/filing/actions/processFileErrors.js'
import fetchUpload from '../../../src/filing/actions/fetchUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { lei: '123' } })

const setItem = jest.fn()
window.localStorage = {
  setItem,
}

describe('handleFile', () => {
  it('creates a thunk to signal file handling', () => {
    expect(typeof handleFile()).toEqual('function')
  })

  it('presence of errors dispatches processFileErrors', () => {
    const file = {}

    checkFileErrors.mockImplementation((id) => ['error'])
    processFileErrors.mockImplementation((id) => {
      return { type: 'argle', errors: ['error'] }
    })
    store.dispatch(handleFile(file, 8))
    expect(store.getActions()).toEqual([{ type: 'argle', errors: ['error'] }])
  })

  it('dispatches showconfirm and selectnewfile when past uploading', () => {
    const store = mockStore({ app: { lei: '123' } })
    const file = {}

    checkFileErrors.mockImplementation((id) => [])
    store.dispatch(handleFile(file, 8))
    expect(store.getActions()).toEqual([
      { type: types.SHOW_CONFIRM, showing: true },
      { type: types.SELECT_NEW_FILE, id: '123', file: {} },
    ])
  })

  it('dispatches showconfirm and selectnewfile when upload error exists', () => {
    const store = mockStore({ app: { lei: '123' } })
    const file = {}

    checkFileErrors.mockImplementation((id) => [])
    store.dispatch(handleFile(file, 2, 1))
    expect(store.getActions()).toEqual([
      { type: types.SHOW_CONFIRM, showing: true },
      { type: types.SELECT_NEW_FILE, id: '123', file: {} },
    ])
  })
  it('dispatches selectfile and fetchUpload when before uploading', () => {
    const store = mockStore({ app: { lei: '123' } })
    const file = {}

    fetchUpload.mockImplementation((id) => {
      return { type: 'fetchup' }
    })
    checkFileErrors.mockImplementation((id) => [])
    store.dispatch(handleFile(file, 1))
    expect(store.getActions()).toEqual([
      { type: types.SELECT_FILE, id: '123', file: {} },
      { type: 'fetchup' },
    ])
  })
})
