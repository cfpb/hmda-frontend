import React from 'react'
import { Link } from 'react-router-dom'
import YEARS from './constants/years'

import './YearSelector.css'

function makeToUrl(year, y, url) {
  if (!year || !url.match(year)) return `${url}/${y}`.replace('//', '/')
  return url.replace(year, y)
}

const YearSelector = ({ year, years = YEARS, url }) => {
  return (
    <div className='YearSelector'>
      <h4>Select a year</h4>
      {years.map((y, i) => {
        const className = y === year ? 'active' : ''
        const toUrl = makeToUrl(year, y, url)
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
