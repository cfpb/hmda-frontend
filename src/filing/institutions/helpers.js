import { splitYearQuarter } from '../api/utils'

export const getNextAnnualPeriod = (periodOptions = { options: [] }) => {
  let annual = periodOptions.options
    ?.filter(period => period.indexOf('Q') === -1)
    .map(period => parseInt(splitYearQuarter(period)[0], 10))
    .sort()

  const nextAnnual = annual && annual[annual.length - 1]

  return (nextAnnual || 2018).toString()
}