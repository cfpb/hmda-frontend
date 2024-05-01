jest.unmock('./institutions.js')
import * as types from '../../../src/filing/constants'
import excludeTypes from '../../../src/filing/reducers/excludeTypes.js'
import institutions from '../../../src/filing/reducers/institutions.js'

describe('institutions reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(institutions({}, {})).toEqual({})
  })

  it('handles REQUEST_INSTITUTIONS', () => {
    expect(institutions({}, { type: types.REQUEST_INSTITUTIONS })).toEqual({
      isFetching: true,
    })
  })

  it('handles REQUEST_INSTITUTION', () => {
    expect(
      institutions({}, { type: types.REQUEST_INSTITUTION, lei: '123' }),
    ).toEqual({
      institutions: {
        123: {
          isFetching: true,
        },
      },
    })
  })

  it('handles RECEIVE_INSTITUTION', () => {
    expect(
      institutions(
        {},
        {
          type: types.RECEIVE_INSTITUTION,
          institution: { lei: '123', name: 'oi' },
        },
      ),
    ).toEqual({
      institutions: {
        123: {
          isFetching: false,
          name: 'oi',
          lei: '123',
        },
      },
    })
  })
  it('handles RECEIVE_INSTITUTIONS', () => {
    expect(institutions({}, { type: types.RECEIVE_INSTITUTIONS })).toEqual({
      isFetching: false,
      fetched: true,
    })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.RECEIVE_INSTITUTIONS,
      types.REQUEST_INSTITUTIONS,
      types.REQUEST_INSTITUTION,
      types.RECEIVE_INSTITUTION,
    ).forEach((v) => expect(institutions({}, v)).toEqual({}))
  })
})
