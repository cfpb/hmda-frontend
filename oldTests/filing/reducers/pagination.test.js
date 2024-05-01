jest.unmock('./pagination.js')
import * as types from '../../../src/filing/constants'
import excludeTypes from '../../../src/filing/reducers/excludeTypes.js'
import pagination from '../../../src/filing/reducers/pagination.js'

const defaultPagination = {}

describe('pagination reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(pagination(undefined, {})).toEqual(defaultPagination)
  })

  it('should positively update paging info on parse errors', () => {
    expect(
      pagination(defaultPagination, {
        type: types.RECEIVE_PARSE_ERRORS,
        pagination: 'parseErrorsPage',
      }),
    ).toEqual({ parseErrors: 'parseErrorsPage' })
  })

  it('handles REFRESH_STATE', () => {
    expect(pagination({}, { type: types.REFRESH_STATE })).toEqual(
      defaultPagination,
    )
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(types.RECEIVE_PARSE_ERRORS).forEach((v) =>
      expect(pagination({}, v)).toEqual({}),
    )
  })
})
