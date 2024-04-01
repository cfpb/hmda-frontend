import { getNextAnnualPeriod } from '../../../src/filing/institutions/helpers'

describe('getNextAnnualPeriod', () => {
  it('defaults to 2018', () => {
    expect(getNextAnnualPeriod()).toBe('2018')
  })

  it('Ignores Quarters', () => {
    expect(getNextAnnualPeriod({ options: ['2020', '2019', '2021-Q2'] })).toBe(
      '2020',
    )
  })
})
