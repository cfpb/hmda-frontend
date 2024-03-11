import React from 'react'
import { useLocation } from 'react-router-dom'
import '../../common/YearSelector.css'

const DBYearSelector = ({ year, years, onChange, label = 'Select a year' }) => {
  const location = useLocation()
  if (!years || years.length < 2) return null

  const clickHandler = (e) => {
    e.preventDefault()
    onChange({ year: e.target.text })
  }

  return (
    <div className='YearSelector'>
      <h4>{label}</h4>
      {years.map((y, i) => {
        const className = y === year ? 'active' : ''
        return (
          <a
            href={`${location.pathname.replace(/20\d\d$/, y)}${
              location.search
            }`}
            className={className}
            onClick={clickHandler}
            key={i}
          >
            {y}
          </a>
        )
      })}
    </div>
  )
}

export default DBYearSelector
