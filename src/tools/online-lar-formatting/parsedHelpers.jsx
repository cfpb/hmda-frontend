import React from 'react'

export const applyFilter = (column, filter) =>
  !filter.length || column.fieldName.toLowerCase().includes(filter)

export const checkHighlighted = (a, b) =>
  a && b && a.fieldIndex === b.fieldIndex ? 'highlight' : ''

export const getType = ({ fieldType }) => {
  if (fieldType == 'Alphanumeric') return 'text'
  if (fieldType == 'Numeric') return 'number'
  return 'text'
}

export const buildOptions = column => {
  const vals = column.values.map(({ value, description }) => (
    <option value={value} key={value}>
      {value === description ? value : `${value} - ${description}`}
    </option>
  ))

  vals.unshift(
    <option key='none' value={''}>
      - No selection -
    </option>
  )
  return vals
}

export const toJsDateString = str => {
  if (!str) return ''
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6)}`
}
