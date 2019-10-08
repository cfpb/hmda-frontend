import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import './UploadForm.css'

export const renderErrors = errors => {
  if (errors.length === 0) return null

  return (
    <div className="alert alert-error" role="alert">
      <div className="alert-body">
        <ul className="alert-text">
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default class Upload extends Component {
  updateDropArea(props) {
    let content = (
      <p>
        Drag your LAR file into this area or click in this box to select a LAR
        file to test.
      </p>
    )
    if (props.file && 'name' in props.file) {
      let check =
        props.errors.length === 0 ? 'Checked' : "Sorry, we can't check"
      content = (
        <React.Fragment>
          <p>
            {check} <strong>{props.file.name}</strong>.
          </p>
          <p>
            Drag another LAR file into this area or click in this box to select
            a LAR file to test.
          </p>
        </React.Fragment>
      )
    }

    return content
  }

  render() {
    // don't do anything if submission is in progress
    const setFile = this.props.code > 1 ? null : this.props.setFile
    const dropzoneDisabled = this.props.code > 1 ? 'dropzone-disabled' : ''
    return (
      <div>
        <div className="UploadForm">
          {renderErrors(this.props.errors)}
          <div className="container-upload">
            <Dropzone
              disablePreview={true}
              onDrop={setFile}
              multiple={false}
              className={`dropzone ${dropzoneDisabled}`}
            >
              <button
                onClick={e => e.preventDefault()}
                ref={node => {
                  this.dropzoneContent = node
                }}
                className="text-small"
              >
                {this.updateDropArea(this.props)}
              </button>
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
  filingPeriod: PropTypes.string
}

Upload.defaultProps = {
  file: {
    name: 'No file chosen'
  },
  errors: []
}
