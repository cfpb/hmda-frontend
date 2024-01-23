import React from 'react'
import PropTypes from 'prop-types'
import RefileButton from '../common/RefileButton'
import Alert from '../../common/Alert.jsx'
import CSVDownload from '../common/CSVContainer.jsx'
import {
  FAILED,
  PARSED_WITH_ERRORS,
  SYNTACTICAL_VALIDITY_EDITS,
  MACRO_EDITS,
  VALIDATED,
} from '../constants/statusCodes.js'

import './RefileWarning.css'

export const getText = (props) => {
  const periodIsClosed = props.isPassed
  let text = null
  let button = !periodIsClosed && <RefileButton />
  let periodAfter = false
  let reviewAndDownload = (
    <div>
      {periodIsClosed ? 'View' : 'Please review'} the edits or{' '}
      <CSVDownload inline={true} />
    </div>
  )

  if (props.code === FAILED) {
    reviewAndDownload = null
    if (periodIsClosed) {
      text = <NoNewChanges className='failed' />
    } else {
      text = (
        <div className='failed'>
          Please select the &quot;Upload a new file&quot; button to restart the
          process. Ensure that your text file has no spaces between characters
          in LEI/ULI fields and is pipe delimited, not tab or comma delimited.
        </div>
      )
    }
  } else if (props.code === SYNTACTICAL_VALIDITY_EDITS) {
    if (periodIsClosed) {
      text = <NoNewChanges />
    } else {
      text = (
        <div>
          Then update your file and select the &quot;Upload a new file&quot;
          button.
        </div>
      )
    }
  } else if (
    (props.qualityExists && props.page === 'quality') ||
    (props.macroExists && props.page === 'macro')
  ) {
    if (periodIsClosed) {
      text = <NoNewChanges />
    } else {
      text = (
        <div style={{ display: 'inline' }}>
          You must verify the edits and select the check box to confirm the data
          is accurate. If the data need to be corrected, please update your file
          and{' '}
        </div>
      )
      button = <RefileButton isLink={true} isLower={true} />
      periodAfter = true
    }
  }
  if (props.code === PARSED_WITH_ERRORS) {
    reviewAndDownload = null
    if (periodIsClosed) {
      text = <NoNewChanges />
    } else {
      text = (
        <div>
          Please update your file and select the &quot;Upload a new file&quot;
          button.
        </div>
      )
    }
  }

  if (!text) return null

  return (
    <div>
      {reviewAndDownload}
      {text}
      {button}
      {periodAfter ? '.' : null}
      <p style={{ marginTop: '15px' }}>
        Need help? Visit our{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={`/documentation/faq/filing-faq`}
        >
          documentation page
        </a>{' '}
        or contact{' '}
        <a
          href='https://hmdahelp.consumerfinance.gov'
          target='_blank'
          rel='noopener noreferrer'
        >
          HMDA Help
        </a>
        .
      </p>
    </div>
  )
}

export const getHeading = (props) => {
  let heading = null

  if (props.code === FAILED) {
    heading = 'Your submission has failed.'
  } else if (props.code === SYNTACTICAL_VALIDITY_EDITS) {
    heading = 'Your file has syntactical and/or validity edits.'
  } else if (props.qualityExists && props.page === 'quality') {
    heading = 'Your file has quality edits.'
  } else if (props.code === MACRO_EDITS && props.page === 'macro') {
    heading = 'Your file has macro quality edits.'
  }

  if (props.code === PARSED_WITH_ERRORS) {
    heading = 'Your file has formatting errors.'
  }

  return heading
}

const NoNewChanges = ({ className }) => {
  return (
    <div className={className}>
      The filing deadline has passed. Changes are no longer accepted.
    </div>
  )
}

const RefileWarning = (props) => {
  const { code, page } = props
  if (code > FAILED) {
    if (code >= VALIDATED || code < PARSED_WITH_ERRORS) return null
    if (page === 'syntacticalvalidity' && code !== SYNTACTICAL_VALIDITY_EDITS)
      return null
    if (
      (page === 'quality' && !props.qualityExists) ||
      (page === 'quality' && props.qualityVerified)
    )
      return null
    if (page === 'macro' && code !== MACRO_EDITS) return null
    if (page === 'upload' && code !== PARSED_WITH_ERRORS) return null
    if (page === 'submission') return null
  }

  let alertClass = 'error'
  if (
    code !== FAILED &&
    code !== SYNTACTICAL_VALIDITY_EDITS &&
    code !== PARSED_WITH_ERRORS
  ) {
    alertClass = 'warning'
  }

  return (
    <div className='RefileWarning'>
      <Alert type={alertClass} heading={getHeading(props)}>
        {getText(props)}
      </Alert>
    </div>
  )
}

RefileWarning.propTypes = {
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
}

export default RefileWarning
