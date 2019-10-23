jest.unmock('./requestInstitution.js')
jest.unmock('../constants')
import * as types from '../constants'
import requestInstitution from './requestInstitution.js'

describe('requestInstitution', () => {
  it('creates an action to signal a request for an institution', () => {
    expect(requestInstitution()).toEqual({
      type: types.REQUEST_INSTITUTION
    })
  })
})
