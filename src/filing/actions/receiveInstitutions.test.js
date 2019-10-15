jest.unmock('./receiveInstitutions.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveInstitutions from './receiveInstitutions.js'

describe('receiveInstitutions', () => {
  it('creates an action to signal new institutions have been acquired', () => {
    expect(receiveInstitutions()).toEqual({
      type: types.RECEIVE_INSTITUTIONS
    })
  })
})
