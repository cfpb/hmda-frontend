/**
 * Plain text input
 *
 * @param {Object} value Current value
 * @param {Object} props Additional input attributes
 */
export const InputText = ({ value, ...props }) => {
  const adjustedValue = value?.toString() || ''
  return <input className='text-input' {...props} value={adjustedValue} />
}
