jest.unmock('./requestInstitution.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import requestInstitution from '../../../src/filing/actions/requestInstitution.js'

describe('requestInstitution', () => {
  it('creates an action to signal a request for an institution', () => {
    expect(requestInstitution()).toEqual({
      type: types.REQUEST_INSTITUTION,
    })
  })
})
