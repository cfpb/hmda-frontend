import React from 'react'

export function FilterResetButton({ onClick }) {
  return (
    <button className='reset-filters' onClick={onClick} type='button'>
      Reset All Filters
    </button>
  )
}
