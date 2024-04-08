import { adjustFocusToTriggerRerender } from '../../hooks/adjustFocusToTriggerRerender'

/**
 * Wrapper component to help conditionally render Filter/Search inputs
 *
 * @param {Boolean} show Should show filter/search inputs?
 * @param {Array<ReactElement>} children Filter/search inputs
 */
export const Filters = ({ show, children }) => {
  if (!show) return null
  return <div className='filters'>{children}</div>
}

/**
 * Input field to collect and clear search/filter strings.
 *
 * @param {Function} onChange Handler for updating Search string in Redux store
 * @param {String} placeholder
 * @param {String} value Search string
 * @param {Boolean} hidden Flag to show/hide Clear button
 * @param {Function} onClear Handler for clearing Search
 * @param {String} clearText Button label
 * @param {Boolean} isTS TS vs LAR
 */
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

  /**
   * This event handler, which completely clears the filter value upon
   * pressing `backspace`, is an attempted workaround for a glitch in
   * react-fluid-table where column sizes/width/alignment are incorrect after
   * changing which columns are displayed (via filtration).
   *
   * This fix only works some of the time.  A more consistent resolution
   * still needs to be found.
   **/
  const backspaceHandler = (e) => {
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
