// Month in bizarre JS 0-11 format
// YYYY will come from state as filingPeriod
export const FILING_START = { month: 0, day: 1 }
export const ONE_WEEK_TO_FILE = { month: 1, day: 21 } // one week out, possibly change messaging
export const FILING_DEADLINE = { month: 2, day: 2 }
export const FILING_PERIODS = [
  '2020', // TODO: Remove
  '2019',
  '2018'
]

export const FILING_QUARTERS = {
  q1: '4/1 - 6/30',
  q2: '7/1 - 9/30',
  q3: '10/1 - 12/31'
} 
