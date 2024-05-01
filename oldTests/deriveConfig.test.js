import { parseTimedGuardDate, formatLocalString } from '../src/deriveConfig'

describe('parseTimedGuardDate', () => {
  const timedGuard = '01/01/2022'
  it('calculates start dates', () => {
    const date = new Date(
      parseTimedGuardDate(timedGuard).toLocaleString('en-US', {
        timeZone: 'America/New_York',
      }),
    )
    expect(date === `${timedGuard}, 12:00:00 AM`)
  })

  it('calculates end dates', () => {
    const date = new Date(
      parseTimedGuardDate(timedGuard, true).toLocaleString('en-US', {
        timeZone: 'America/New_York',
      }),
    )
    expect(date === `${timedGuard}, 11:59:59 PM`)
  })
})

describe('formatLocalString', () => {
  it('outputs date string', () => {
    expect(formatLocalString(new Date(2022, 0, 1)) == 'January 1, 2022')
    expect(formatLocalString(new Date(2022, 4, 1)) == 'April 1, 2022')
    expect(formatLocalString(new Date(2022, 11, 16)) == 'December 16, 2022')
  })
})
