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
  isTS,
}) => {
  const selector = isTS ? '#saved-ts' : '#saved-lars'

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

// Hacky attempt to fix column width after a cleared columnFilter
const adjustFocusToTriggerRerender = (selector) =>
  setTimeout(() => {
    const arr = [
      ...document.querySelectorAll(selector + ' .react-fluid-table-row'),
    ]
    const middleIdx = parseInt(arr.length / 2)

    setTimeout(() => {
      arr[middleIdx].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }, 0)

    const arr2 = [...document.querySelectorAll(selector + ' #header-record-identifier')]
    arr2.forEach(el => el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    }))
  }, 0)