import React from 'react'

/**
 * Displays the Saved Records title, with the fraction of records that match
 * the search/filter criteria (if applicable).
 *
 * @param {String} title
 * @param {Array} filteredRows
 * @param {Array} rows
 */
export const SectionTitle = ({ title, filteredRows, rows }) => {
  const countLabel = rowCountLabel(filteredRows, rows)

  return (
    <div className='count'>
      {title} {countLabel}
    </div>
  )
}

const rowCountLabel = (filteredRows, rows) => {
  const countsAreEqual = filteredRows.length == rows.length
  if (countsAreEqual) return `(${rows.length})`
  return `(${filteredRows.length}/${rows.length})`
}
