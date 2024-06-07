import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { useScrollIntoView } from '../../../common/useScrollIntoView'
import Alert from '../../../common/Alert'

import './UploadForm.css'

let timeout = null

export const UploadErrors = ({ errors = [], parsed, parseErrors }) => {
  const [ref, scrollToRef] = useScrollIntoView()

  useEffect(() => {
    scrollToRef()
  }, [errors, scrollToRef, parseErrors, parsed, ref])

  if (!parsed && !parseErrors && !errors.length) return null

  if (errors.length)
    return (
      <span ref={ref}>
        <Alert type='error' heading='Invalid File'>
          {errors.length > 1 ? (
            <ul>
              {errors.map((error, i) => {
                return <li key={i}>{error}</li>
              })}
            </ul>
          ) : (
            <p>{errors[0]}</p>
          )}
        </Alert>
      </span>
    )

  if (!errors.length && !parseErrors)
    return (
      <span ref={ref}>
        <Alert type='success' heading='Congratulations! No Formatting Errors.'>
          <p>Your file meets the specified formatting requirements.</p>
        </Alert>
      </span>
    )

  return null
}

export default class Upload extends Component {
  updateDropArea(props, fileStatus) {
    let content = (
      <p>
        Drag your LAR file into this area or click in this box to select a LAR
        file to test.
      </p>
    )
    if (props.file && 'name' in props.file) {
      const statusText =
        props.errors.length !== 0
          ? "Sorry, we can't check "
          : fileStatus === 'error'
            ? 'Errors found in '
            : 'No errors found in '
      content = (
        <React.Fragment>
          <p>
            {statusText} <strong>{props.file.name}</strong>.
          </p>
          <p>
            Drag another LAR file into this area or click in this box to select
            a LAR file to test.
          </p>
        </React.Fragment>
      )
    }

    return <div className='dropzone-content'>{content}</div>
  }

  componentDidUpdate() {
    if (!document.activeElement) return
    if (document.activeElement.classList[0] === 'dropzone')
      document.activeElement.blur()
  }

  render() {
    const {
      setFile,
      code,
      parseErrors,
      errors = [],
      file = { name: 'No file chosen' },
    } = this.props
    const { parsed, errorCount } = parseErrors || {}
    const uploadErrorCount = errors.length
    const dropzoneDisabled = code > 1 ? 'dropzone-disabled' : ''
    const fileStatus =
      !parsed && !uploadErrorCount
        ? ''
        : errorCount + uploadErrorCount > 0
          ? 'error'
          : 'success'

    return (
      <div>
        <div className={`UploadForm ${fileStatus}`}>
          <UploadErrors
            errors={errors}
            parsed={parsed}
            parseErrors={errorCount}
          />
          <div className='container-upload'>
            <Dropzone disablePreview={true} onDrop={setFile} multiple={false}>
              {({ getRootProps, getInputProps }) => {
                return (
                  <div
                    {...getRootProps({
                      className: `dropzone ${dropzoneDisabled}`,
                    })}
                  >
                    <input {...getInputProps()} />
                    {this.updateDropArea(this.props, fileStatus)}
                  </div>
                )
              }}
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  setFile: PropTypes.func,
  uploading: PropTypes.bool,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array,
  filingPeriod: PropTypes.string,
}
