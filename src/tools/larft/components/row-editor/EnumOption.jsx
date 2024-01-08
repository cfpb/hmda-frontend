/**
 * Composes a list of enumeration <option>
 *
 * @param {Object} column Field details
 * @returns Array of <option> elements
 */
export const buildEnumeratedOptions = (column) => {
  const { enumerations, fieldName } = column

  const options = enumerations.map(({ value, description }, idx) => (
    <EnumOption
      key={`${idx}-${fieldName}-${value}`}
      {...{ value, description, fieldName, idx }}
    />
  ))

  options.unshift(
    <option key='none' value=''>
      - No selection -
    </option>,
  )

  return options
}

const EnumOption = ({ value, description }) => {
  return (
    <option value={value}>{formatEnumerationLabel(value, description)}</option>
  )
}

const formatEnumerationLabel = (value, description) => {
  if (value === description) return value
  return `${value} - ${description}`
}
