import { formatPeriod } from '../../../src/filing/api/utils'

describe('formatPeriod', () => {
  it('handles strings', () => {
    expect(formatPeriod('2018')).toBe('2018')
  })

  it('handles quarterly without quarter', () => {
    expect(formatPeriod({ quarter: null, year: 2018 })).toBe('2018')
  })

  it('handles quarterly with quarter', () => {
    expect(formatPeriod({ quarter: 'q1', year: 2018 })).toBe('2018/quarter/Q1')
  })
})
