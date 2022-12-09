import React from 'react'
import { scrollToID } from '../../utils/common'

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
        onChange={e => setFilter(e.target.value)}
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

const backspaceHandler = (setFilter) => (e) => {
  if (e.code == 'Backspace' && e.target.value) {
    setFilter('')
    e.preventDefault()
  }
}