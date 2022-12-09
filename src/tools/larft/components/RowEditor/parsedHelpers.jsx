import React from 'react'

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

export const getHighlightClass = (currentField, selectedColumnName) => {
  const isMatch =
    selectedColumnName &&
    currentField &&
    selectedColumnName === currentField.fieldName

  return isMatch ? 'highlight' : ''
}

export const getFieldType = ({ fieldType }) => {
  if (fieldType == 'Alphanumeric') return 'text'
  if (fieldType == 'Numeric') return 'number'
  return 'text'
}

export const buildEnumeratedOptions = column => {
  const options = column.enumerations.map(({ value, description }) => (
    <EnumOption {...{ value, description }} />
  ))

  options.unshift(
    <option key='none' value=''>
      - No selection -
    </option>
  )

  return options
}

const EnumOption = ({ value, description }) => {
  return (
    <option value={value} key={value}>
      {formatEnumerationLabel(value, description)}
    </option>
  )}

const formatEnumerationLabel = (value, description) => {
  if (value === description) return value
  return `${value} - ${description}`
}