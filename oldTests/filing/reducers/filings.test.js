jest.unmock('./filings.js')
import * as types from '../../../src/filing/constants'
import excludeTypes from '../../../src/filing/reducers/excludeTypes.js'
import filings from '../../../src/filing/reducers/filings.js'

const defaultFilings = {}

describe('filings reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(filings(defaultFilings, {})).toEqual(defaultFilings)
  })

  it('handles REQUEST_FILING', () => {
    expect(
      filings(
        {},
        {
          type: types.REQUEST_FILING,
          lei: '2',
        },
      ),
    ).toEqual({
      2: {
        isFetching: true,
        fetched: false,
        filing: null,
      },
    })
  })
  it('handles RECEIVE_FILING', () => {
    expect(
      filings(
        {},
        {
          type: types.RECEIVE_FILING,
          filing: { filing: { lei: '2' } },
        },
      ),
    ).toEqual({
      2: {
        isFetching: false,
        fetched: true,
        filing: { filing: { lei: '2' } },
      },
    })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(types.RECEIVE_FILING, types.REQUEST_FILING).forEach((v) =>
      expect(filings(defaultFilings, v)).toEqual(defaultFilings),
    )
  })
})
