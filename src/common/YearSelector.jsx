import React from 'react'
import { Link } from 'react-router-dom'
import YEARS from './constants/years'

import './YearSelector.css'

const YearSelector = props => {
  const { year, url } = props

  return (
    <div className="YearSelector">
      <h4>Select a year</h4>
      {YEARS.map((y, i) => {
        const className = y === year ? 'active' : ''
        const toUrl = url.replace(year, y)
        return (
          <Link to={toUrl} className={className} key={i}>
            {y}
          </Link>
        )
      })}
    </div>
  )
}

export default YearSelector
