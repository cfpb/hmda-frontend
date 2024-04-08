import React from 'react'
import PropTypes from 'prop-types'
import * as STATUS from '../../constants/statusCodes.js'

const formatMessage = ({ pre, post }, filename) => {
  return (
    <p>
      {pre} <strong>{filename}</strong> {post}.
    </p>
  )
}

const DropzoneContent = ({
  getRootProps,
  getInputProps,
  code,
  filename,
  errorFile,
  isDisabled,
}) => {
  let message = ''
  let messageObj = {}

  if (filename) {
    switch (code) {
      case STATUS.CREATED:
        messageObj = {
          pre: '',
          post: 'selected',
        }
        break
      case STATUS.UPLOADING:
        messageObj = {
          pre: 'Upload of',
          post: 'is currently in progress',
        }
        break
      case STATUS.UPLOADED:
      case STATUS.PARSING:
      case STATUS.PARSED:
      case STATUS.VALIDATING:
      case STATUS.NO_SYNTACTICAL_VALIDITY_EDITS:
      case STATUS.NO_QUALITY_EDITS:
        messageObj = {
          pre: 'Analysis of',
          post: 'is currently in progress',
        }
        break
      case STATUS.PARSED_WITH_ERRORS:
        messageObj = {
          pre: 'Upload of',
          post: 'has formatting errors',
        }
        break
      case STATUS.SYNTACTICAL_VALIDITY_EDITS:
        messageObj = {
          pre: 'Upload of',
          post: 'is ready for review',
        }
        break
      case STATUS.QUALITY_EDITS:
        messageObj = {
          pre: 'Upload of',
          post: 'is ready for review',
        }
        break
      case STATUS.MACRO_EDITS:
        messageObj = {
          pre: 'Upload of',
          post: 'is ready for review',
        }
        break
      case STATUS.NO_MACRO_EDITS:
      case STATUS.VALIDATED:
        messageObj = {
          pre: 'Upload of',
          post: 'is ready for submission',
        }
        break
      case STATUS.SIGNED:
        messageObj = {
          pre: 'Upload of',
          post: 'is complete',
        }
        break
      default:
        break
    }

    message = formatMessage(messageObj, filename)
  }

  if (errorFile) {
    message = formatMessage({ pre: '', post: 'cannot be uploaded' }, errorFile)
  }

  let classname = 'dropzone'
  if (isDisabled) classname += ' dropzone-disabled'

  return (
    <div {...getRootProps({ className: classname })}>
      <input {...getInputProps()} />
      <p className='file-selected'>
        {isDisabled
          ? 'The filing period is closed. New uploads are no longer accepted.'
          : 'To begin uploading a new file, drag it into this box or click here.'}
      </p>
      {message}
    </div>
  )
}

DropzoneContent.propTypes = {
  getRootProps: PropTypes.func,
  getInputProps: PropTypes.func,
  code: PropTypes.number,
  errorFile: PropTypes.string,
  filename: PropTypes.string,
}

export default DropzoneContent
