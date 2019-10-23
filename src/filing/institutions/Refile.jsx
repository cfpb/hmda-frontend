import React from 'react'
import PropTypes from 'prop-types'
import RefileButton from '../refileButton/container.jsx'
import { PARSED_WITH_ERRORS, VALIDATING } from '../constants/statusCodes.js'

const InstitutionRefile = ({ status, institution }) => {
  if (!status || !status.code) return null
  if (status.code === PARSED_WITH_ERRORS || status.code > VALIDATING) {
    return (
      <RefileButton institution={institution} isLink={true} isSmall={true} />
    )
  } else {
    return null
  }
}

InstitutionRefile.propTypes = {
  status: PropTypes.object,
  institution: PropTypes.object
}

export default InstitutionRefile
