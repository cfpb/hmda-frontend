import React from 'react'

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
