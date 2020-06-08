import React from 'react'
import '../../common/YearSelector.css'

const DBYearSelector = ({ year, years, onChange }) => {
  if(!years || years.length < 2) return null

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
