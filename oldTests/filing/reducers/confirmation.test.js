jest.unmock('./confirmation.js')
import * as types from '../../../src/filing/constants'
import excludeTypes from '../../../src/filing/reducers/excludeTypes.js'
import confirmation from '../../../src/filing/reducers/confirmation.js'

const defaultConfirmation = {
  showing: false,
}

describe('confirmation reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(confirmation(undefined, {})).toEqual(defaultConfirmation)
  })

  it('should positively set confirmation', () => {
    expect(
      confirmation(defaultConfirmation, {
        type: types.SHOW_CONFIRM,
        showing: true,
      }),
    ).toEqual({ showing: true })
  })

  it('should negatively set confirmation', () => {
    expect(
      confirmation(
        { showing: true },
        { type: types.HIDE_CONFIRM, showing: false },
      ),
    ).toEqual({ showing: false })
  })
})
