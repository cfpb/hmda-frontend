import React from 'react'
import PropTypes from 'prop-types'

import './FilingPeriodSelector.css'

const filingPeriods = ['2019', '2018', '2017']

const FilingPeriodSelector = props => {
  return (
    <form className="FilingPeriodSelector usa-form">
      <select value={props.filingPeriod} onChange={props.onChange}>
        {filingPeriods.map(filingPeriod => {
          return (
            <option key={filingPeriod} value={filingPeriod}>
              {filingPeriod}
            </option>
          )
        })}
      </select>
    </form>
  )
}

FilingPeriodSelector.propTypes = {
  filingPeriod: PropTypes.string,
  onChange: PropTypes.func
}

export default FilingPeriodSelector
