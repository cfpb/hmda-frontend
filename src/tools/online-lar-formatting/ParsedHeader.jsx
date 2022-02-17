import React from 'react'
import { goTo } from './utils'

export const ParsedHeader = ({ filter, setFilter, id }) => (
  <div className='section-heading'>
    <h3 className='title clickable' onClick={() => goTo(id)}>
      Parsed Values
    </h3>
    <input
      type='text'
      name='filter'
      id='filter'
      value={filter}
      placeholder={'Filter by label'}
      onChange={e => setFilter(e.target.value.toLowerCase())} />
    {!!filter.length && (
      <button
        className='clear'
        onClick={() => {
          setFilter('')
          document.getElementById('filter').focus()
        }}
      >
        clear
      </button>
    )}
  </div>
)
