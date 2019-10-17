import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loading from '../../common/LoadingIcon.jsx'
import {
  VALIDATING,
  SYNTACTICAL_VALIDITY_EDITS,
  MACRO_EDITS,
  VALIDATED
} from '../constants/statusCodes.js'

import './NavButton.css'

const NavButton = ({ page, base, code, editsFetched, validationComplete, qualityExists, qualityVerified }) => {
  let className
  let suffix
  let spinOn = false
  const editFetchInProgress = code < VALIDATED && validationComplete && !editsFetched
  const preError = code <= VALIDATING || !validationComplete

  switch (page) {
    case 'upload':
      suffix = 'syntacticalvalidity'
      if (preError || editFetchInProgress) className = 'hidden'
      if (editFetchInProgress) spinOn = true
      break
    case 'syntacticalvalidity':
      suffix = 'quality'
      if (preError || code === SYNTACTICAL_VALIDITY_EDITS) className = 'hidden'
      break
    case 'quality':
      suffix = 'macro'
      if (preError || (qualityExists && !qualityVerified)) className = 'hidden'
      break
    case 'macro':
      suffix = 'submission'
      if (preError || code === MACRO_EDITS) className = 'hidden'
      break
    default:
      return null
  }

  let displayName = suffix === 'syntacticalvalidity' ? '' : suffix
  displayName = suffix !== 'submission' ? `${displayName} Edits` : displayName

  return [
    spinOn ? (
      <React.Fragment key="0">
        <Loading className="NavSpinner" />{' '}
        <span style={{ display: 'inline-block', marginLeft: '50px' }}>
          Retrieving your edits now
        </span>
      </React.Fragment>
    ) : null,
    <Link
      key="1"
      className={`NavButton button ${className || ''}`}
      tabIndex={className === 'hidden' ? -1 : 0}
      to={`${base}/${suffix}`}
    >
      {`Review ${displayName}`}
    </Link>
  ]
}

NavButton.propTypes = {
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  editsFetched: PropTypes.bool,
  validationComplete: PropTypes.bool,
  qualityExists: PropTypes.bool,
  qualityVerified: PropTypes.bool
}

export default NavButton
