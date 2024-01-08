import React from 'react'
import PropTypes from 'prop-types'
import {
  PARSED_WITH_ERRORS,
  SYNTACTICAL_VALIDITY_EDITS,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  NO_QUALITY_EDITS,
  NO_MACRO_EDITS,
  MACRO_EDITS,
  VALIDATED,
  SIGNED,
  UPLOADED,
} from '../constants/statusCodes.js'

import './Progress.css'

const navMap = {
  upload: {
    isErrored: (submission) =>
      submission.status.code === PARSED_WITH_ERRORS || submission.isStalled,
    isCompleted: (submission) => submission.status.code > UPLOADED,
    errorText: 'upload error',
    completedText: 'uploaded',
  },
  'syntactical & validity edits': {
    isErrored: (submission) =>
      submission.status.code === SYNTACTICAL_VALIDITY_EDITS,
    isCompleted: (submission) =>
      submission.status.code >= NO_SYNTACTICAL_VALIDITY_EDITS,
    errorText: 'syntactical & validity edits',
    completedText: 'no syntactical & validity edits',
  },
  'quality edits': {
    isErrored: (submission) =>
      submission.qualityExists && !submission.qualityVerified,
    isCompleted: (submission) =>
      submission.status.code >= NO_QUALITY_EDITS &&
      (!submission.qualityExists || submission.qualityVerified),
    errorText: 'quality edits',
    completedText: 'quality edits verified',
  },
  'macro quality edits': {
    isErrored: (submission) =>
      submission.macroExists && !submission.macroVerified,
    isCompleted: (submission) =>
      (submission.status.code > MACRO_EDITS ||
        submission.status.code === NO_MACRO_EDITS) &&
      (!submission.macroExists || submission.macroVerified),
    errorText: 'macro quality edits',
    completedText: 'macro quality edits verified',
  },
  submission: {
    isReachable: (submission) =>
      submission.status.code >= VALIDATED ||
      submission.status.code === NO_MACRO_EDITS,
    isErrored: () => false,
    isCompleted: (submission) => submission.status.code === SIGNED,
    completedText: 'submitted',
  },
}

const renderNavItem = (submission, name, i) => {
  const navItem = navMap[name]
  const completed = navItem.isCompleted(submission)
  const errored = navItem.isErrored(submission)
  let renderedName = name
  let navClass = ''
  if (errored) {
    renderedName = navItem.errorText
    navClass = 'error'
  } else if (completed) {
    renderedName = navItem.completedText
    navClass = 'complete'
  }

  if (name === 'submission' && navItem.isReachable(submission) && !completed) {
    // using error class is misleading but the styling is what we need
    navClass = 'error'
  }

  let step = i + 1
  if (navClass === 'complete') step = null

  return (
    <li key={i} className={navClass}>
      <div key={0} className='step'>
        {step}
      </div>
      <span key={1}>{renderedName}</span>
    </li>
  )
}

const Progress = ({ submission = { status: { code: 1 } } }) => {
  return (
    <section className='Progress'>
      <nav className='EditsNav' id='editsNav'>
        <ul className='nav-primary'>
          {Object.keys(navMap).map((name, i) => {
            return renderNavItem(submission, name, i)
          })}
        </ul>
        <hr className='nav-bg' />
      </nav>
    </section>
  )
}

Progress.propTypes = {
  status: PropTypes.object,
}

export default Progress
