import React from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../../constants/statusCodes.js'

const getProgressText = ({ code, validationComplete, errorApp, errorUpload }) => {
  let progressText = 'Uploading...'

  if (code === STATUS.PARSING) progressText = 'Analyzing file format...'
  if (code === STATUS.PARSED_WITH_ERRORS)
    progressText = 'File contains formatting errors.'
  if (code >= STATUS.VALIDATING && !validationComplete) progressText = 'Validating edits...'
  if (validationComplete) progressText = 'Edit validation complete.'

  if (errorUpload)
    progressText = 'There was an error uploading your file. Please try again.'
  else if (errorApp)
    progressText =
      'There was an error checking your validation progress. Please refresh the page.'

  return progressText
}

const getExtraMessage = ({ code, validationComplete, qualityExists, qualityVerified, errorApp, errorUpload, file }) => {
  if (file && file.size > 1e5) {
    if (code <= STATUS.UPLOADED)
      return 'Please do not close your browser until the file upload has completed.'
    if (
      // the process is still running
      // and there are no errors
      code > STATUS.UPLOADED &&
      !validationComplete &&
      code !== STATUS.PARSED_WITH_ERRORS &&
      !errorUpload &&
      !errorApp
    ) {
      return 'Your file has been successfully uploaded and is being analyzed and validated. You may close your browser and log back in later.'
    }
  }

  if (
    code === STATUS.SYNTACTICAL_VALIDITY_EDITS ||
    (qualityExists && !qualityVerified) ||
    code === STATUS.MACRO_EDITS
  ) {
    return 'Edits found, review required.'
  }

  return null
}

const getIndicatorClass = ({ code, validationComplete, errorApp, errorUpload }) => {
  if (code === STATUS.PARSED_WITH_ERRORS || errorUpload || errorApp) {
    return 'error'
  }
  if (validationComplete) {
    return 'complete'
  }
  return 'pulsing'
}

const ProgressText = props => {
  return (
    <section className="progressText">
      <p>
        {getProgressText(props)}{' '}
        <span className={`progressIndicator ${getIndicatorClass(props)}`} />
      </p>
      <p>
        <strong>{getExtraMessage(props)}</strong>
      </p>
    </section>
  )
}

ProgressText.propTypes = {
  errorApp: PropTypes.object,
  errorUpload: PropTypes.object,
  file: PropTypes.object,
  //../progressHOC
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  editsFetched: PropTypes.bool,
  validationComplete: PropTypes.bool,
  qualityExists: PropTypes.bool,
  qualityVerified: PropTypes.bool
}

export default ProgressText
