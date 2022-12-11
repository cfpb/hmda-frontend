export const InputEnumeratedSelector = ({ value, options, ...common }) => {
  return (
    <select {...common} value={value || ''}>
      {options}
    </select>
  )
}
