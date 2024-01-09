import { splitYearQuarter } from '../api/utils'
import { UPLOADED } from '../constants/statusCodes'
import { hoursSince } from '../utils/date'

const MAX_UPLOAD_HOURS = 5

export const getNextAnnualPeriod = (periodOptions = { options: [] }) => {
  let annual = periodOptions.options
    ?.filter((period) => period.indexOf('Q') === -1)
    .map((period) => parseInt(splitYearQuarter(period)[0], 10))
    .sort()

  const nextAnnual = annual && annual[annual.length - 1]

  return (nextAnnual || 2018).toString()
}

export const isStalledUpload = (code, start) =>
  code === UPLOADED && hoursSince(start) > MAX_UPLOAD_HOURS
