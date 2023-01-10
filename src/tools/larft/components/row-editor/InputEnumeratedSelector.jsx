/**
 * An enumerated input with many (>3) options, displayed
 * as a drop-down menu.
 *
 * @param {Object} value Current field value
 * @param {Object} options Enumerations converted to <option> elements
 * @param {Object} common Additional input attributes
 */
export const InputEnumeratedSelector = ({ value, options, ...common }) => {
  return (
    <select {...common} value={value || ''}>
      {options}
    </select>
  )
}
