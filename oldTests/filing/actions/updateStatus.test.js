jest.unmock('./updateStatus.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import updateStatus from '../../../src/filing/actions/updateStatus.js'

describe('updateStatus', () => {
  it('creates an action to update the status', () => {
    const status = {
      code: 10,
      message: '',
    }
    expect(updateStatus(status)).toEqual({
      type: types.UPDATE_STATUS,
      status: status,
    })
  })
})
