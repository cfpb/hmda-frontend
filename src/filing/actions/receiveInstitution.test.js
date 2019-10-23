jest.unmock('./receiveInstitution.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveInstitution from './receiveInstitution.js'

describe('receiveInstitution', () => {
  it('creates an action to signal a new institution has been acquired', () => {
    const data = {
      institution: { a: 1 }
    }

    expect(receiveInstitution(data)).toEqual({
      type: types.RECEIVE_INSTITUTION,
      institution: data.institution
    })
  })
})
