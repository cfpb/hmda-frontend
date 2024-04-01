jest.unmock('./parseErrors.js')
import * as types from '../../../src/filing/constants'
import excludeTypes from '../../../src/filing/reducers/excludeTypes.js'
import parseErrors from '../../../src/filing/reducers/parseErrors.js'

const defaultParseErrors = {
  isFetching: false,
  fetched: false,
  transmittalSheetErrors: [],
  larErrors: [],
}

describe('parseErrors reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(parseErrors(undefined, {})).toEqual(defaultParseErrors)
  })

  it('handles REQUEST_PARSE_ERRORS', () => {
    const action = {
      type: 'REQUEST_PARSE_ERRORS',
    }
    expect(parseErrors({}, action)).toEqual({
      isFetching: true,
    })
  })

  it('handles REFRESH_STATE', () => {
    expect(parseErrors({}, { type: 'REFRESH_STATE' })).toEqual(
      defaultParseErrors,
    )
  })

  it('handles RECEIVE_PARSE_ERRORS', () => {
    expect(
      parseErrors(
        { a: 2 },
        {
          type: 'RECEIVE_PARSE_ERRORS',
          transmittalSheetErrors: 1,
          larErrors: 2,
        },
      ),
    ).toEqual({
      isFetching: false,
      fetched: true,
      transmittalSheetErrors: 1,
      larErrors: 2,
    })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.RECEIVE_PARSE_ERRORS,
      types.REFRESH_STATE,
      types.REQUEST_PARSE_ERRORS,
    ).forEach((v) => expect(parseErrors({}, v)).toEqual({}))
  })
})
