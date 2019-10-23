import React from 'react'
import PropTypes from 'prop-types'
import CSVDownload from '../common/CSVContainer.jsx'
import { CREATED, NO_QUALITY_EDITS, NO_MACRO_EDITS, SIGNED, VALIDATING } from '../constants/statusCodes.js'

import './Status.css'

const defaultSubmission = {
  status: {
    code: CREATED,
    message: 'No data has been uploaded yet.',
    description:
      'The filing period is open and available to accept HMDA data. Make sure your data is in a pipe-delimited text file.'
  }
}

const qualityMessage = 'Your data has quality edits that need to be reviewed.'
const submitMessage = 'Your data is ready for submission.'
const submitDesc = 'Your financial institution has certified that the data is correct, but it has not been submitted yet.'


const InstitutionStatus = props => {
  const submission = props.submission || defaultSubmission
  const { code, message, description } = submission.status
  const qualityOverride = code > NO_QUALITY_EDITS && (submission.qualityExists && !submission.qualityVerified)
  const submitOverride = code === NO_MACRO_EDITS

  return (
    <section className="status">
      <h4>{qualityOverride ? qualityMessage : submitOverride ? submitMessage : message}</h4>
      <p>{submitOverride ? submitDesc : description}</p>
      {props.filing.status.code === 3 && code !== SIGNED ? (
        <p className="text-small">
          You have previously submitted a HMDA file and are in the process of
          refiling. If you do not complete your current refiling process, your
          original submission will be accepted for the current filing period.
        </p>
      ) : null}
      {code > VALIDATING ? (
        <div className="text-small" style={{ lineHeight: '1.5em' }}>
          <CSVDownload submission={submission} text="Download edit report" />
        </div>
      ) : null}
    </section>
  )
}

InstitutionStatus.propTypes = {
  filing: PropTypes.object,
  submission: PropTypes.object
}

export default InstitutionStatus
