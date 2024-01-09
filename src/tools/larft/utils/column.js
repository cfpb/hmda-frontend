// Accepted Enumerations - List will need to be updated with new entries.
const KNOWN_ENUMERATIONS = [
  'NA',
  'Exempt',
  '7777',
  '8888',
  '9999',
  'No co-applicant',
]

export const isColumnState = (column) => column?.fieldName?.includes('State')

export const isColumnDate = (column) => column?.fieldName?.includes('Date')

export const isCombinedInput = (column) => {
  const { examples = [], enumerations = [] } = column

  return (
    examples.length &&
    enumerations.length &&
    enumerations.some((e) => KNOWN_ENUMERATIONS.includes(e.value))
  )
}
