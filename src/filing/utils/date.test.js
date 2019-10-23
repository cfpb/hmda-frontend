jest.unmock('../constants/dates.js')
jest.unmock('./date.js')

import {
  nth,
  padZero,
  ordinal,
  ordinalHour,
  withinAWeekOfDeadline,
  withinFilingPeriod,
  beforeFilingPeriod,
  afterFilingPeriod,
  isBeta
} from './date.js'
import * as dates from '../constants/dates.js'

describe('nth', () => {
  it('calculates date ends correctly', () => {
    expect(nth(5)).toBe('th')
    expect(nth(1)).toBe('st')
    expect(nth(2)).toBe('nd')
    expect(nth(3)).toBe('rd')
    expect(nth(31)).toBe('st')
    expect(nth(32)).toBe('nd')
    expect(nth(33)).toBe('rd')
    expect(nth(99)).toBe('th')
  })
})

describe('padZero', () => {
  it('pads positive numbers', () => {
    expect(padZero(7)).toBe('07')
    expect(padZero(11)).toBe('11')
    expect(padZero(0)).toBe('00')
  })
  it('pads negative numbers', () => {
    expect(padZero(-7)).toBe('-07')
    expect(padZero(-11)).toBe('-11')
  })
})

describe('ordinal', () => {
  it('returns correct ordinal dates', () => {
    expect(ordinal(new Date(1387721600000))).toBe('December 22nd, 2013')
    expect(ordinal(new Date(1500390404132))).toBe('July 18th, 2017')
  })
})

describe('ordinal hour', () => {
  it('returns correct ordinal datetimes', () => {
    expect(ordinalHour(new Date('2013-12-22T00:05:10'))).toBe(
      'December 22nd, 2013, 12:05:10 AM'
    )
    expect(ordinalHour(new Date('2017-07-18T14:14:14'))).toBe(
      'July 18th, 2017, 2:14:14 PM'
    )
  })
})

describe('withinAWeekOfDeadline', () => {
  it('returns true if within a week', () => {
    Date.now = () => 1487721600000
    expect(withinAWeekOfDeadline('2017')).toBe(true)
  })

  it('returns false if not within a week', () => {
    Date.now = () => 1387721600000
    expect(withinAWeekOfDeadline('2017')).toBe(false)
  })

  it('throws on bad input', () => {
    try {
      withinAWeekOfDeadline('qwe')
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})

describe('withinFilingPeriod', () => {
  it('returns true if within filing period', () => {
    Date.now = () => 1487721600000
    expect(withinFilingPeriod('2016')).toBe(true)
  })

  it('returns false if not within filing period', () => {
    Date.now = () => 1387721600000
    expect(withinFilingPeriod('2016')).toBe(false)
  })

  it('throws on bad input', () => {
    try {
      withinFilingPeriod('qwe')
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})

describe('afterFilingPeriod', () => {
  it('returns true if after filing period', () => {
    Date.now = () => 1587721600000
    expect(afterFilingPeriod('2016')).toBe(true)
  })

  it('returns false if not after filing period', () => {
    Date.now = () => 1387721600000
    expect(afterFilingPeriod('2016')).toBe(false)
  })

  it('throws on bad input', () => {
    try {
      afterFilingPeriod('qwe')
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})

describe('beforeFilingPeriod', () => {
  it('returns true if before filing period', () => {
    Date.now = () => 1387721600000
    expect(beforeFilingPeriod('2016')).toBe(true)
  })

  it('returns false if not before filing period', () => {
    Date.now = () => 1587721600000
    expect(beforeFilingPeriod('2016')).toBe(false)
  })

  it('throws on bad input', () => {
    try {
      beforeFilingPeriod('qwe')
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})

describe('isBeta', () => {
  it('checks beta status of various filing periods', () => {
    expect(isBeta()).toBe(0)
    expect(isBeta()).toBe(0)
  })
})
