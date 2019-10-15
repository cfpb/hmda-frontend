import React from 'react'
import { FILING_PERIODS } from '../constants/dates.js'

import './YearSelector.css'

const YearSelector = props => {

  const currentYear = props.filingPeriod
  return (
    <div className="YearSelector">
      <h4>Select a filing period</h4>
      {FILING_PERIODS.map((year, i) => {
        const className = year === currentYear ? 'active' : ''
        return (
          <a href={props.pathname.replace(currentYear, year)} className={className} key={i}>
            {year}
          </a>
        )
      })}
    </div>
  )
}

export default YearSelector
