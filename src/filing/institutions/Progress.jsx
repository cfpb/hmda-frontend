import React from 'react'
import PropTypes from 'prop-types'
import {
  PARSED_WITH_ERRORS,
  PARSED,
  SYNTACTICAL_VALIDITY_EDITS,
  QUALITY_EDITS,
  MACRO_EDITS,
  VALIDATED,
  SIGNED
} from '../constants/statusCodes.js'

import './Progress.css'

const navMap = {
  upload: {
    isErrored: code => code === PARSED_WITH_ERRORS,
    isCompleted: code => code >= PARSED,
    errorText: 'uploaded with formatting errors',
    completedText: 'uploaded'
  },
  'syntactical & validity edits': {
    isErrored: code => code === SYNTACTICAL_VALIDITY_EDITS,
    isCompleted: code => code > SYNTACTICAL_VALIDITY_EDITS,
    errorText: 'syntactical & validity edits',
    completedText: 'no syntactical & validity edits'
  },
  'quality edits': {
    isErrored: code => code === QUALITY_EDITS,
    isCompleted: code => code > QUALITY_EDITS,
    errorText: 'quality edits',
    completedText: 'quality edits verified'
  },
  'macro quality edits': {
    isErrored: code => code === MACRO_EDITS,
    isCompleted: code => code > MACRO_EDITS,
    errorText: 'macro quality edits',
    completedText: 'macro quality edits verified'
  },
  submission: {
    isReachable: code => code >= VALIDATED,
    isErrored: () => false,
    isCompleted: code => code === SIGNED,
    completedText: 'submitted'
  }
}

const renderNavItem = (status, name, i) => {
  const { code, qualityVerified } = status
  const navItem = navMap[name]
  const completed = navItem.isCompleted(code, qualityVerified)
  const errored = navItem.isErrored(code)

  let renderedName = name
  let navClass = ''
  if (errored) {
    renderedName = navItem.errorText
    navClass = 'error'
  } else if (completed) {
    renderedName = navItem.completedText
    navClass = 'complete'
  }

  if (name === 'submission' && navItem.isReachable(code) && !completed) {
    // using error class is misleading but the styling is what we need
    navClass = 'error'
  }

  let step = i + 1
  if (navClass === 'complete') step = null

  return (
    <li key={i} className={navClass}>
      <div key={0} className="step">
        {step}
      </div>
      <span key={1}>{renderedName}</span>
    </li>
  )
}

const Progress = ({ status = { code: 1 } }) => {
  return (
    <section className="Progress">
      <nav className="EditsNav" id="editsNav">
        <ul className="nav-primary">
          {Object.keys(navMap).map((name, i) => {
            return renderNavItem(status, name, i)
          })}
        </ul>
        <hr className="nav-bg" />
      </nav>
    </section>
  )
}

Progress.propTypes = {
  status: PropTypes.object
}

export default Progress
