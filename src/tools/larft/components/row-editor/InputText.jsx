export const InputText = ({ value, ...props }) => {
  const adjustedValue = value?.toString() || ''
  return <input className='text-input' {...props} value={adjustedValue} />
}
