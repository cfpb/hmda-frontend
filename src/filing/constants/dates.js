// Month in bizarre JS 0-11 format
// YYYY will come from state as filingPeriod
export const FILING_START = { month: 0, day: 1 }
export const ONE_WEEK_TO_FILE = { month: 1, day: 21 } // one week out, possibly change messaging
export const FILING_DEADLINE = { month: 2, day: 2 }

export const FILING_QUARTERS = {
  q1: '04/01 - 06/30',
  q2: '07/01 - 09/30',
  q3: '10/1 - 12/31',
  q3: '01/01 - 12/31' // TODO: Remove
} 

export const currentQuarterlyPeriod = (d = new Date()) => {
  const padDate = d => (d < 10 ? `0${d}` : d)
  const month = d.getMonth() + 1
  const day = d.getDate() + 1
  const monthDay = `${padDate(month)}/${padDate(day)}`

  for (let quarter of Object.keys(FILING_QUARTERS)) {
    let [lower, upper] = FILING_QUARTERS[quarter].split(' - ')
    if (monthDay >= lower && monthDay <= upper)
      return `${d.getFullYear()}-${quarter.toUpperCase()}`
  }

  return null
}