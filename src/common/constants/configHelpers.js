import { splitYearQuarter } from '../../filing/api/utils'

export const getFilingYears = config => {
  let filingYears = new Set()
  
  // Collect all PREVIEW or available (filingPeriods) years
  let tmpFilingYears = [...config.filingPeriods, ...(config.filingQuarters.PREVIEW || [])]

  // Unique
  tmpFilingYears.forEach(yr => filingYears.add(splitYearQuarter(yr)[0]))
  tmpFilingYears = []
  filingYears.forEach(yr => tmpFilingYears.push(yr))
  
  // As Ints, sorted descending
  filingYears = tmpFilingYears.filter(x => x).map(x => parseInt(x, 10)).sort().reverse()
  return filingYears
}