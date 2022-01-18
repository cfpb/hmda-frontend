import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RefileButton from '../refileButton/container.jsx'
import { isBeta } from '../../common/Beta';

import {
  FAILED,
  CREATED,
  PARSED_WITH_ERRORS,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  VALIDATING,
  NO_MACRO_EDITS,
  VALIDATED,
} from '../constants/statusCodes.js'

import './ViewButton.css'

const InstitutionViewButton = ({ submission, institution, filingPeriod, isClosed }) => {
  const { status, isStalled } = submission
  const code = status ? status.code : CREATED
  let text
  
  if (isClosed && code <= CREATED) return null
  if (code === FAILED || isStalled) {
    return <RefileButton className="ViewButton" institution={institution} />
  } else if (code <= CREATED) {
    text = "Upload your " + (isBeta() ? 'test file' : 'official file')
  } else if (code < PARSED_WITH_ERRORS) {
    text = 'View upload progress'
  } else if (code === PARSED_WITH_ERRORS) {
    text = 'Review formatting errors'
  } else if (code < NO_SYNTACTICAL_VALIDITY_EDITS) {
    text = 'View progress'
  } else if (code > VALIDATING && code < VALIDATED && code !== NO_MACRO_EDITS) {
    text = 'Review edits'
  } else if (code === VALIDATED || code === NO_MACRO_EDITS) {
    text = 'Review summary'
  } else {
    text = 'View completed filing'
  }

  return (
    <Link
      className="ViewButton button"
      to={`/filing/${filingPeriod}/${institution.lei}/`}
    >
      {text}
    </Link>
  )
}

InstitutionViewButton.propTypes = {
  status: PropTypes.object,
  institution: PropTypes.object,
  filingPeriod: PropTypes.string,
  isClosed: PropTypes.bool
}

export default InstitutionViewButton
