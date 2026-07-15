import PropTypes from 'prop-types'
import {
  MACRO_EDITS,
  NO_MACRO_EDITS,
  NO_QUALITY_EDITS,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  PARSED_WITH_ERRORS,
  SIGNED,
  SYNTACTICAL_VALIDITY_EDITS,
  UPLOADED,
  VALIDATED,
} from '../constants/statusCodes.js'

import './Progress.scss'

const navMap = {
  'Upload LAR': {
    isErrored: (submission) =>
      submission.status.code === PARSED_WITH_ERRORS || submission.isStalled,
    isCompleted: (submission) => submission.status.code > UPLOADED,
    errorText: 'Upload LAR',
    completedText: 'Upload LAR',
  },
  'Syntactical & validity edits': {
    isErrored: (submission) =>
      submission.status.code === SYNTACTICAL_VALIDITY_EDITS,
    isCompleted: (submission) =>
      submission.status.code >= NO_SYNTACTICAL_VALIDITY_EDITS,
    errorText: 'Syntactical & validity edits',
    completedText: 'Syntactical & validity edits',
  },
  'Quality edits': {
    isErrored: (submission) =>
      submission.qualityExists && !submission.qualityVerified,
    isCompleted: (submission) =>
      submission.status.code >= NO_QUALITY_EDITS &&
      (!submission.qualityExists || submission.qualityVerified),
    errorText: 'Quality edits',
    completedText: 'Quality edits',
  },
  'Macro quality edits': {
    isErrored: (submission) =>
      submission.macroExists && !submission.macroVerified,
    isCompleted: (submission) =>
      (submission.status.code > MACRO_EDITS ||
        submission.status.code === NO_MACRO_EDITS) &&
      (!submission.macroExists || submission.macroVerified),
    errorText: 'Macro quality edits',
    completedText: 'Macro quality edits',
  },
  'Review & submit': {
    isReachable: (submission) =>
      submission.status.code >= VALIDATED ||
      submission.status.code === NO_MACRO_EDITS,
    isErrored: () => false,
    isCompleted: (submission) => submission.status.code === SIGNED,
    completedText: 'Review & submit',
  },
}

function toUsaClass(navClass) {
  const parts = navClass.split(' ')
  let base = 'usa-step-indicator__segment'
  for (const p of parts) {
    if (p === 'active' || p === 'error')
      base += ' usa-step-indicator__segment--current'
    else if (p === 'complete') base += ' usa-step-indicator__segment--complete'
    else base += ` ${p}`
  }
  return base
}

function renderNavItem(submission, name, i) {
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
    navClass = 'error'
  }

  return (
    <li key={i} className={toUsaClass(navClass)}>
      <span className='usa-step-indicator__segment-label'>
        {renderedName}
        {completed ? <span className='usa-sr-only'>completed</span> : null}
        {!completed && <span className='usa-sr-only'>not completed</span>}
      </span>
    </li>
  )
}

function Progress({ submission = { status: { code: 1 } } }) {
  const keys = Object.keys(navMap)

  return (
    <div
      className='usa-step-indicator usa-step-indicator--counters'
      aria-label='progress'
    >
      <ol className='usa-step-indicator__segments'>
        {keys.map((name, i) => renderNavItem(submission, name, i))}
      </ol>
    </div>
  )
}

Progress.propTypes = {
  status: PropTypes.object,
}

export default Progress
