import { parseCombinedFilter } from '../../../src/data-browser/maps/selectUtils'

describe('parseCombinedFilter', () => {
  it('parses variable and value', () => {
    const expected = {
      value: { label: '3 - VA', value: '3' },
      variable: { label: 'Loan Type', value: 'loanType' },
    }
    expect(parseCombinedFilter({ value: 'loanType - 3' })).toEqual(expected)
  })

  it('parses encoded option', () => {
    const expected = {
      value: { label: '<25', value: '%3C25' },
      variable: { label: 'Age', value: 'age' },
    }
    expect(parseCombinedFilter({ value: 'age - %3C25' })).toEqual(expected)
  })
})
