import React from 'react'
import PropTypes from 'prop-types'
import { VALIDATING, SIGNED } from '../../constants/statusCodes.js'

import './RefileText.css'

export const getStatus = code => {
  let status
  let appendComplete = null

  if (code > VALIDATING) {
    status = 'is in progress'
    if (code === SIGNED) status = 'has already been submitted'
  }

  if (code === SIGNED) {
    appendComplete =
      ' and your new HMDA file will not be submitted until you clear and/or verify all edits and submit the data'
  }

  const message = status ? (
    <p>
      The HMDA data for this filing year <strong>{status}</strong>
      {appendComplete}.
    </p>
  ) : null

  return message
}

const RefileText = props => {
  return (
    <div className="RefileText">
      <p className="usa-font-lead">
        Are you sure you want to replace your HMDA data for this filing?
      </p>
      {getStatus(props.code)}
    </div>
  )
}

RefileText.propTypes = {
  code: PropTypes.number.isRequired
}

export default RefileText
