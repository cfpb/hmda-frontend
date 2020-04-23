import React from 'react'
import '../../common/YearSelector.css'
import DB_YEARS from '../constants/years'

const DBYearSelector = ({ year, years = DB_YEARS, onChange }) => {
  const clickHandler = (e) => {
    e.preventDefault()
    onChange({ year: e.target.text })
  }

  return (
    <div className='YearSelector'>
      <h4>Select a year</h4>
      {years.map((y, i) => {
        const className = y === year ? 'active' : ''
        return (
          <a href={`/data-browser/data/${y}`} className={className} onClick={clickHandler} key={i}>
            {y}
          </a>
        )
      })}
    </div>
  )
}

export default DBYearSelector
