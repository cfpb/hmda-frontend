/**
 * An input with enumerations that also allows for freeform text.
 *
 * @param {Object} column Field details
 * @param {Object} row LAR/TS row content
 * @param {Object} common Additional input attributes
 */
export const InputEnumeratedComplex = ({ column, row, ...common }) => {
  const { enumerations } = column
  const needsSelector = enumerations.length >= 3
  const userInput = row[column.fieldName]

  const content = needsSelector ? (
    <Selector
      {...common}
      enumerations={enumerations}
      value={allowOptionOther(userInput, enumerations)}
    />
  ) : (
    <Buttons {...common} enumerations={enumerations} value={userInput} />
  )

  return <span className='enums'>{content}</span>
}

const Selector = ({ value, enumerations, name, ...common }) => {
  return (
    <select {...common} value={value}>
      {enumerations.map((e, idx) => {
        return (
          <option key={`${name}-${e.value}-${idx}}`} value={e.value}>
            {e.description}
          </option>
        )
      })}
    </select>
  )
}

const Buttons = ({ onChange, enumerations, value, name }) => {
  return enumerations.map((enumeration, idx) => {
    const key = `${name}-${enumeration.value}-${idx}`
    const className = enumeration.value === value ? 'enum selected' : 'enum'

    const clickHandler = () =>
      onChange({
        target: { id: name, value: enumeration.value },
      })

    return (
      <button key={key} className={className} onClick={clickHandler}>
        {getLabel(enumeration)}
      </button>
    )
  })
}

const getLabel = ({ description, value }) => {
  if (description == value) return value
  return description
}

const allowOptionOther = (userInput, enumerations) => {
  // Display enumerated value in drop-down if input matches
  if (enumerations.some((enumeration) => enumeration.value == userInput)) {
    return userInput
  }

  // Display "Other" option
  return ''
}
