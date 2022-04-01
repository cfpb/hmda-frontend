import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loading from '../../common/LoadingIcon.jsx'
import {
  VALIDATING,
  SYNTACTICAL_VALIDITY_EDITS,
  VALIDATED,
} from '../constants/statusCodes.js'

import './NavButton.css'

const nextActionableStep = ({
  qualityExists,
  qualityVerified,
  macroExists,
  macroVerified,
  code,
}) => {
  if (code === VALIDATED) return 'submission'
  if (qualityExists && !qualityVerified) return 'quality'
  if (macroExists && !macroVerified) return 'macro'
  return 'syntacticalvalidity'
}

const NavButton = ({ page, base, code, editsFetched, validationComplete, qualityExists, qualityVerified, macroExists, macroVerified }) => {
  let className
  let suffix
  let spinOn = false
  const editFetchInProgress = code < 14 && !editsFetched
  const preError = code <= VALIDATING || !validationComplete
  const actionableArgs = {
    code,
    qualityExists,
    qualityVerified,
    macroExists,
    macroVerified,
  }
  switch (page) {
    case 'upload':
      suffix = nextActionableStep(actionableArgs)
      if (preError || editFetchInProgress) className = 'hidden'
      if (editFetchInProgress && code > VALIDATING && code !== 8 && code !== 11) spinOn = true
      break
    case 'syntacticalvalidity':
      suffix = nextActionableStep(actionableArgs)
      if (preError || code === SYNTACTICAL_VALIDITY_EDITS || editFetchInProgress) className = 'hidden'
      break
    case 'quality':
      suffix = nextActionableStep(actionableArgs)
      if (preError || (qualityExists && !qualityVerified) || editFetchInProgress) className = 'hidden'
      break
    case 'macro':
      suffix = nextActionableStep(actionableArgs)
      if (preError || (macroExists && !macroVerified) || editFetchInProgress) className = 'hidden'
      break
    default:
      return null
  }

  let displayName = suffix === 'syntacticalvalidity' ? '' : suffix
  displayName = suffix !== 'submission' ? `${displayName} Edits` : displayName

  return (
    <div className="NavButtonContainer">
      <Link
        className={`NavButton button ${className || ''}`}
        tabIndex={className === 'hidden' ? -1 : 0}
        to={`${base}/${suffix}`}
      >
        {`Review ${displayName}`}
      </Link>
      {spinOn ?
        <>
          <span>Fetching edits...</span>
          <Loading className="LoadingInline"/>
        </>
        : null
      }
    </div>
  )
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
