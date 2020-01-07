export function formatPeriod(period) {
  if (typeof period === 'string') return period

  let { quarter, year } = period

  if (!quarter) return `${year}`
  return `${year}/quarter/${quarter.toUpperCase()}`
}

export function separateYearQuarter(per) {
  return per.split('-')
}

export function yearQuarterToPath(yearPeriod) {
  const [year, quarter] = separateYearQuarter(yearPeriod)
  return formatPeriod({ year, quarter })
}
