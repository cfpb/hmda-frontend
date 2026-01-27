export function formatPeriod(period) {
  if (typeof period === 'string') return period

  const { quarter, year } = period

  if (!quarter) return `${year}`
  return `${year}/quarter/${quarter.toUpperCase()}`
}

export function splitYearQuarter(per) {
  if (!per) return []
  return per.split('-')
}

// Split edit IDs with sub-parts (e.g. Q659-1, Q659-2)
// to retrieve just the primary edit ID
export function splitEditPart(edit) {
  if (!edit) return []
  return edit.split('-')
}

export function yearQuarterToPath(yearPeriod) {
  const [year, quarter] = splitYearQuarter(yearPeriod)
  return formatPeriod({ year, quarter })
}

export function isQuarterly(period) {
  return Boolean(splitYearQuarter(period)[1])
}
