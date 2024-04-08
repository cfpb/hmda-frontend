export const getFieldType = ({ fieldType }) => {
  if (fieldType == 'Alphanumeric') return 'text'
  if (fieldType == 'Numeric') return 'number'
  return 'text'
}

export const formatDateString = (str) => {
  if (!str) return ''
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6)}`
}
