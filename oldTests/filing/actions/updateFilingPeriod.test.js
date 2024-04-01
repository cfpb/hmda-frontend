jest.unmock('./updateFilingPeriod.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import updateFilingPeriod from '../../../src/filing/actions/updateFilingPeriod.js'

describe('updateFilingPeriod', () => {
  it('creates an action to update the filing period', () => {
    expect(updateFilingPeriod('123')).toEqual({
      type: types.UPDATE_FILING_PERIOD,
      filingPeriod: '123',
    })
  })
})
