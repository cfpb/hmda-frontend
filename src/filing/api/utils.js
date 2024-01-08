export function formatPeriod(period) {
  if (typeof period === 'string') return period

  let { quarter, year } = period

  if (!quarter) return `${year}`
  return `${year}/quarter/${quarter.toUpperCase()}`
}

export function splitYearQuarter(per) {
  if (!per) return []
  return per.split('-')
}

export function yearQuarterToPath(yearPeriod) {
  const [year, quarter] = splitYearQuarter(yearPeriod)
  return formatPeriod({ year, quarter })
}

export function isQuarterly(period) {
  return Boolean(splitYearQuarter(period)[1])
}
