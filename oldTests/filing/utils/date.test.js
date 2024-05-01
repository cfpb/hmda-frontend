jest.unmock('./date.js')

import {
  nth,
  padZero,
  ordinal,
  ordinalHour,
  stdTimezoneOffset,
  isDstObserved,
  easternOffsetHours,
} from '../../../src/filing/utils/date.js'

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
      'December 22nd, 2013, 12:05:10 AM',
    )
    expect(ordinalHour(new Date('2017-07-18T14:14:14'))).toBe(
      'July 18th, 2017, 2:14:14 PM',
    )
  })
})

describe('stdTimezoneOffset', () => {
  it('identifies standard time offset', () => {
    expect(stdTimezoneOffset(new Date()) === 5)
  })
})

describe('isDstObserved', () => {
  it('recognizes when DST applies', () => {
    expect(isDstObserved(new Date(2022, 0, 1)) === false)
    expect(isDstObserved(new Date(2022, 2, 1)) === false)
    expect(isDstObserved(new Date(2022, 2, 13)) === true)
    expect(isDstObserved(new Date(2022, 5, 13)) === true)
    expect(isDstObserved(new Date(2022, 7, 13)) === true)
    expect(isDstObserved(new Date(2022, 9, 13)) === true)
    expect(isDstObserved(new Date(2022, 10, 1)) === true)
    expect(isDstObserved(new Date(2022, 10, 13)) === false)
    expect(isDstObserved(new Date(2022, 11, 13)) === false)
  })
})

describe('easternOffsetHours', () => {
  it.skip('calculates correct hour adjustment accounting for DST', () => {
    /* 
    / This function's output depends on the end user's system settings. 
    / Users in ET will get a different offset than users in PT.
    / Needs more thought into how to get consistent test results. 
    */
  })
})
