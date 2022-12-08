import { applyFilter } from '../parsedHelpers'

export const applyRowFilter = ({
  searchFilter,
  targetSchema,
  columnFilter,
  rows,
  matchedColumns,
}) => {
  if (!searchFilter) return rows

  const filtered = rows.filter(_row => {
    let hasMatches = false

    targetSchema.forEach(col => {
      // Only search targeted columns
      if (!applyFilter(col, columnFilter)) return

      const fieldValue = _row[col.fieldName]
      if (!fieldValue) return

      const itMatches = fieldValue
        .toString()
        .toLowerCase()
        .includes(searchFilter.toLowerCase())

      if (itMatches) {
        matchedColumns.push(col.fieldName)
        hasMatches = true
      }
    })

    return hasMatches
  })

  return filtered
}
