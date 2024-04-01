jest.unmock('./hideConfirm.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import hideConfirm from '../../../src/filing/actions/hideConfirm.js'

describe('hideConfirm', () => {
  it('creates an action signalling hiding of the confirmation modal', () => {
    expect(hideConfirm()).toEqual({
      type: types.HIDE_CONFIRM,
      showing: false,
    })
  })
})
