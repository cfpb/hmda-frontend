export function formatPeriod(period) {
  if (typeof period === 'string') return period

  let { quarter, year } = period

  if (!quarter) return `${year}`
  return `${year}/quarter/${quarter.toUpperCase()}`
}

export function splitYearQuarter(per) {
  return per.split('-')
}

export function yearQuarterToPath(yearPeriod) {
  const [year, quarter] = splitYearQuarter(yearPeriod)
  return formatPeriod({ year, quarter })
}
