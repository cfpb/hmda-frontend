jest.unmock('../../src/js/actions')
jest.unmock('../../src/js/constants')

import fs from 'fs'
import * as actions from '../../src/js/actions'
import * as types from '../../src/js/constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe('actions', () => {
  it('creates an action to update the status', () => {
    const status = {
      code: 10,
      message: '',
    }
    expect(actions.updateStatus(status)).toEqual({
      type: types.UPDATE_STATUS,
      status: status,
    })
  })

  it('creates an action to signal file selection', () => {
    const file = { size: 42, name: 'test.txt' }

    expect(actions.selectFile(file)).toEqual({
      type: types.SELECT_FILE,
      file,
      errors: [],
    })
  })
})
