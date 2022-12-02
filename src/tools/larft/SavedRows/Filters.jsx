/**
 * Components for searching/filtering saved rows
 */

export const Filters = ({ show, children }) => {
  if (!show) return null
  return <div className='filters'>
    {children}
  </div>
}

export const SearchBox = ({
  onChange,
  placeholder,
  value,
  hidden,
  onClear,
  clearText,
}) => (
  <span className='search-box'>
    <input
      type='text'
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      hidden={hidden}
    />
    {!!value.length && (
      <button className='clear' onClick={onClear}>
        {clearText}
      </button>
    )}
  </span>
)
