import PropTypes from 'prop-types'
import React from 'react'
import { getDefaultConfig } from '../../../common/configUtils'
import { getOpenFilingYears } from '../../../common/constants/configHelpers'
import './FilingPeriodSelector.css'

const filingPeriods = getOpenFilingYears(getDefaultConfig(window.location.hostname))

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
