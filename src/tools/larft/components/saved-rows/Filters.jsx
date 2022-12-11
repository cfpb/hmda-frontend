import { adjustFocusToTriggerRerender } from '../../hooks/adjustFocusToTriggerRerender'

/**
 * Components for searching/filtering saved rows
 */

export const Filters = ({ show, children }) => {
  if (!show) return null
  return <div className='filters'>{children}</div>
}

export const SearchBox = ({
  onChange,
  placeholder,
  value,
  hidden,
  onClear,
  clearText,
  isTS,
}) => {
  const selector = isTS ? '#saved-ts' : '#saved-lars'

  const backspaceHandler = e => {
    if (e.code == 'Backspace' && value) {
      onClear()
      e.preventDefault()
      adjustFocusToTriggerRerender(selector)
    }
  }

  const clearButtonHandler = () => {
    onClear()
    adjustFocusToTriggerRerender(selector)
  }

  return (
    <span className='search-box'>
      <input
        type='text'
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        hidden={hidden}
        onKeyDown={backspaceHandler}
      />
      {!!value.length && (
        <button className='clear' onClick={clearButtonHandler}>
          {clearText}
        </button>
      )}
    </span>
  )
}
