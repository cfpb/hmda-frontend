/**
 * Determines if the fieldName of the column matches the provided filter
 *
 * @param {Object} column
 * @param {String} filter
 * @returns Boolean
 */
export const matchColumnFilter = (column, filter) => {
  if (!filter.length) return true

  const nameLower = column.fieldName.toLowerCase()
  const filterLower = filter?.toLowerCase()

  return nameLower.includes(filterLower)
}

/**
 * Determines if the value matches the provided filter
 *
 * @param {String} value
 * @param {String} filter
 * @returns Boolean
 */
export const matchSearchFilter = (value, filter) => {
  return value.toString().toLowerCase().includes(filter.toLowerCase())
}

/**
 * Returns a list of rows who's columns that match the columnFilter
 * also have content which matches the searchFilter.
 *
 * @param {String} searchFilter
 * @param {Object} schema
 * @param {String} columnFilter
 * @param {Array} rows
 * @param {Array} matchedColumns
 * @returns Array of matching row objects
 */
export const applyRowFilter = ({
  searchFilter,
  schema,
  columnFilter,
  rows,
  matchedColumns,
}) => {
  if (!searchFilter) return rows

  const filtered = rows.filter((_row) => {
    let hasMatches = false

    schema.forEach((col) => {
      // Only search targeted columns
      if (!matchColumnFilter(col, columnFilter)) return

      const fieldValue = _row[col.fieldName]
      if (!fieldValue) return

      // Check for matching content
      if (matchSearchFilter(fieldValue, searchFilter)) {
        matchedColumns.push(col.fieldName)
        hasMatches = true
      }
    })

    return hasMatches
  })

  return filtered
}
