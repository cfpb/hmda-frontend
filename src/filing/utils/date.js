export const months =
  'January,February,March,April,May,June,July,August,September,October,November,December'.split(
    ',',
  )

export function nth(d) {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export function padZero(n) {
  if (n > 9 || n < -9) return '' + n
  return n < 0 ? '-0' + -n : '0' + n
}

export function ordinal(d, options = { nthDate: true }) {
  const { nthDate } = options
  const month = months[d.getMonth()]
  const day = d.getDate()
  const dayStr = `${day}${nthDate ? nth(day) : ''}`
  return `${month} ${dayStr}, ${d.getFullYear()}`
}

export function ordinalHour(d) {
  const mil = d.getHours()
  const period = mil > 11 ? 'PM' : 'AM'
  const hour = mil % 12 ? mil % 12 : 12
  const min = padZero(d.getMinutes())
  const sec = padZero(d.getSeconds())

  return `${ordinal(d)}, ${hour}:${min}:${sec} ${period}`
}

const msToDays = (ms) => ms / (1000 * 60 * 60 * 24)

const msToHours = (ms) => ms / (1000 * 60 * 60)

export const numDaysBetween = function (d1, d2) {
  var diff = d1.getTime() - d2.getTime()
  return msToDays(diff)
}

export const hoursSince = (timestamp) => {
  const diffTime = Date.now() - timestamp
  return msToHours(diffTime)
}

export const stdTimezoneOffset = (date) => {
  var jan = new Date(date.getFullYear(), 0, 1)
  var jul = new Date(date.getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
}

export const isDstObserved = (date = new Date()) => {
  return date.getTimezoneOffset() < stdTimezoneOffset(date)
}

// Calculate hour adjustment needed to convert to Eastern timezone
// Standard = GMT-5, Daylight Savings = GMT-4
export const easternOffsetHours = (date = new Date()) => {
  const eastOffset = isDstObserved() ? 4 : 5
  return date.getTimezoneOffset() / 60 - eastOffset
}

/**
 * Function to format timestamp and return a string with eastern timezone
 * @param {Number} timeToFormat timestamp of when receipt was submitted
 * @returns formatted string that includes month, day, year and time from ET
 */
export const formatReceiptTime = (timeToFormat) => {
  let timezone = {
    timeZone: 'America/New_York',
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...timezone,
  }

  const date = new Date(timeToFormat)

  return (
    date.toLocaleDateString('en-US', options) +
    ',' +
    date.toLocaleString('en-US', timezone).split(',')[1] +
    ' ET'
  )
}
