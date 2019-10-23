jest.unmock('./getPaginationReceiveAction.js')
jest.unmock('../constants')
import * as types from '../constants'
import getPaginationReceiveAction from './getPaginationReceiveAction.js'

const pagination = {
  _links: undefined,
  count: undefined,
  total: undefined
}

const emptyParseErrors = {
  type: types.RECEIVE_PARSE_ERRORS,
  larErrors: undefined,
  transmittalSheetErrors: undefined,
  pagination
}

describe('getPaginationReceiveAction', () => {
  it('gets the correct receive actions', () => {
    expect(getPaginationReceiveAction('parseErrors', {})).toEqual(
      emptyParseErrors
    )
    expect(getPaginationReceiveAction('q021', {})).toEqual({
      type: types.RECEIVE_EDIT,
      edit: undefined,
      pagination
    })
  })
})
