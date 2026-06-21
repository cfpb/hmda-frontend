/**
 * A cute recursive function to dig through and exit early if it finds a non-zero
 * value for keys containing "count" or "value"
 * @param {*} node - The report object or nested object to search for non-zero values
 * @returns {boolean} True if a non-zero value is found, otherwise false
 */
export const hasNonZeroValue = (node) => {
  if (!node || typeof node !== 'object') return false
  return Object.entries(node).some(([key, value]) =>
    /(count|value)$/i.test(key)
      ? typeof value === 'number' && value !== 0
      : hasNonZeroValue(value),
  )
}

/**
 * Runs hasNonZeroValue for any given report except those without numerical values like the
 * IRS and Reporting Financial Institutions ("I") report
 * @param {object} report - A report object to check for non-zero values
 * @returns {boolean} True if every value is zero, otherwise false
 */
export const areAllReportValuesZero = (report) => {
  if (report.table === 'IRSCSV') return false
  if (report.table === 'I') return false
  try {
    return !hasNonZeroValue(report)
  } catch (error) {
    // not sure what to do other than log it for a poor dev
    console.log(error)

    // if there's an error, return false to not show the notice just to be safe
    return false
  }
}
