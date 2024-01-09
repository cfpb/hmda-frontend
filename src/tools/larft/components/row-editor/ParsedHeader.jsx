import React from 'react'
import { scrollToID } from '../../utils/common'

/**
 * Section label along with a text input box used to filter
 * the displayed columns by Column Label.
 *
 * @param {String} id Section identifier
 * @param {String} filter Filter value
 * @param {Function} setFilter Change handler to update filter value
 */
export const ParsedHeader = ({ filter, setFilter, id }) => (
  <div className='section-heading'>
    <h3 className='title clickable' onClick={() => scrollToID(id)}>
      Parsed Values
    </h3>
    <div className='search-box'>
      <input
        type='text'
        name='filter'
        id='filter'
        value={filter}
        placeholder={'Filter by label'}
        onChange={(e) => setFilter(e.target.value)}
        onKeyDown={backspaceHandler(setFilter)}
      />
      {!!filter.length && (
        <button
          className='clear'
          onClick={() => {
            setFilter('')
            document.getElementById('filter').focus()
          }}
        >
          Clear Filter
        </button>
      )}
    </div>
  </div>
)

/**
 * This event handler, which completely clears the filter value upon
 * pressing `backspace`, is an attempted workaround for a glitch in
 * react-fluid-table where column sizes/width/alignment are incorrect after
 * changing which columns are displayed (via filtration).
 *
 * This fix only works some of the time.  A more consistent resolution
 * still needs to be found.
 **/
const backspaceHandler = (setFilter) => (e) => {
  if (e.code == 'Backspace' && e.target.value) {
    setFilter('')
    e.preventDefault()
  }
}
