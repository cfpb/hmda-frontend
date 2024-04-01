jest.unmock('./requestInstitutions.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestInstitutions from '../../../src/filing/actions/requestInstitutions.js'

describe('requestInstitutions', () => {
  it('creates an action to signal a request for institutions', () => {
    expect(requestInstitutions()).toEqual({
      type: types.REQUEST_INSTITUTIONS,
    })
  })
})
