import React from 'react'
import PropTypes from 'prop-types'
import RefileButton from '../refileButton/container.jsx'
import { PARSED_WITH_ERRORS, VALIDATING } from '../constants/statusCodes.js'
import { afterFilingPeriod } from '../utils/date'

const InstitutionRefile = ({ status, institution, filingPeriod }) => {
  if (!status || !status.code) return null
  if (status.code === PARSED_WITH_ERRORS || status.code > VALIDATING) {
    return (
      <RefileButton institution={institution} isLink={true} isSmall={true} isDisabled={disableRefile(filingPeriod)} />
    )
  } else {
    return null
  }
}

function disableRefile(filingPeriod) {
  return filingPeriod.indexOf('Q') > -1
    ? afterFilingPeriod(filingPeriod)
    : false
}

InstitutionRefile.propTypes = {
  status: PropTypes.object,
  institution: PropTypes.object
}

export default InstitutionRefile
