jest.unmock('./getPaginationRequestAction.js')
jest.unmock('../constants')
import * as types from '../constants'
import getPaginationRequestAction from './getPaginationRequestAction.js'

describe('getPaginationRequestAction', () => {
  it('gets the correct request actions', () => {
    expect(getPaginationRequestAction('parseErrors')).toEqual({
      type: types.REQUEST_PARSE_ERRORS
    })
    expect(getPaginationRequestAction('q021')).toEqual({
      type: types.REQUEST_EDIT,
      edit: 'q021'
    })
  })
})
