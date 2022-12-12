export const matchColumnFilter = (column, filter) => {
  if (!filter.length) return true

  const nameLower = column.fieldName.toLowerCase()
  const filterLower = filter?.toLowerCase()

  return nameLower.includes(filterLower)
}

export const matchSearchFilter = (value, filter) => {
  return value
    .toString()
    .toLowerCase()
    .includes(filter.toLowerCase())
}

export const applyRowFilter = ({
  searchFilter,
  schema,
  columnFilter,
  rows,
  matchedColumns,
}) => {
  if (!searchFilter) return rows

  const filtered = rows.filter(_row => {
    let hasMatches = false

    schema.forEach(col => {
      // Only search targeted columns
      if (!matchColumnFilter(col, columnFilter)) return

      const fieldValue = _row[col.fieldName]
      if (!fieldValue) return

      if (matchSearchFilter(fieldValue, searchFilter)) {
        matchedColumns.push(col.fieldName)
        hasMatches = true
      }
    })

    return hasMatches
  })

  return filtered
}
