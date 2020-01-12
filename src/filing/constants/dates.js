// Month in bizarre JS 0-11 format
// YYYY will come from state as filingPeriod
export const FILING_START = { month: 0, day: 1 }
export const ONE_WEEK_TO_FILE = { month: 1, day: 21 } // one week out, possibly change messaging
export const FILING_DEADLINE = { month: 2, day: 2 }

export const MIN_QUARTERLY_YEAR = 2020
export const FILING_QUARTERS = {
  Q1: '04/01 - 06/30',
  Q2: '07/01 - 09/30',
  Q3: '10/01 - 12/31',
  // TODO: Remove
  Q1: '01/01 - 01/02',
  Q3: '01/01 - 12/31'
}