import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../../../common/Alert.jsx'
import ValidationProgress from './ValidationProgress.jsx'
import FileProcessingProgress from './FileProcessingProgress'
import Dropzone from 'react-dropzone'
import DropzoneContent from './DropzoneContent.jsx'
import {
  UPLOADING,
  PARSED_WITH_ERRORS,
  SYNTACTICAL_VALIDITY_EDITS,
  NO_MACRO_EDITS,
  MACRO_EDITS,
  VALIDATED
} from '../../constants/statusCodes.js'

import './UploadForm.css'

export default class Upload extends Component {
  constructor(props) {
    super(props)

    // handle the onDrop to set the file and show confirmation modal
    this.onDrop = acceptedFiles => {
      const { handleDrop, code, errorUpload } = this.props
      handleDrop(acceptedFiles, code, errorUpload)
    }
  }

  componentDidMount() {
    const { code, pollSubmission } = this.props
    if (
      code >= UPLOADING &&
      code < VALIDATED &&
      code !== PARSED_WITH_ERRORS &&
      code !== SYNTACTICAL_VALIDITY_EDITS &&
      code !== NO_MACRO_EDITS &&
      code !== MACRO_EDITS
    )
      pollSubmission()
  }

  render() {
    const {
      code,
      errorApp,
      errorFile,
      errors,
      errorUpload,
      file,
      filename,
      filingPeriod,
      lei,
      uploading,
      processProgress,
      watchProgress
    } = this.props

    return (
      <section className="UploadForm">
        {/*
          something is wrong with the file
          detected by the front-end
        */}
        {errors.length > 0 ? (
          <Alert heading="Sorry, your file has errors." type="error">
            <ul>
              {errors.map((error, i) => {
                return <li key={i}>{error}</li>
              })}
            </ul>
          </Alert>
        ) : null}
        <Dropzone
          disablePreview={true}
          onDrop={this.onDrop}
          multiple={false}
          disabled={this.props.isPassedQuarter}
        >
          {({getRootProps, getInputProps}) => {
            return (
              <DropzoneContent
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                code={code}
                errorFile={errorFile}
                filename={filename}
                isDisabled={this.props.isPassedQuarter}
              />
            )
          }}
        </Dropzone>
        {/* 
          TODO: Replace ValidationProgress with a multistage version, driven by Websocket data
        */}
        <ValidationProgress
          code={code}
          errorApp={errorApp}
          errorUpload={errorUpload}
          file={file}
          filingPeriod={filingPeriod}
          lei={lei}
          uploading={uploading}
          hasUploadErrors={errors.length}
        />        
        <FileProcessingProgress 
          code={code}
          progress={processProgress}
          uploading={uploading}
          watchProgress={watchProgress}
          file={file}
          filingPeriod={filingPeriod}
          lei={lei}
          hasUploadErrors={errors.length}
        />
      </section>
    )
  }
}

Upload.propTypes = {
  // data
  code: PropTypes.number, // submission status
  errorApp: PropTypes.object,
  errorFile: PropTypes.string,
  errors: PropTypes.array,
  errorUpload: PropTypes.object,
  file: PropTypes.object,
  filename: PropTypes.string,
  filingPeriod: PropTypes.string,
  lei: PropTypes.string,
  uploading: PropTypes.bool,
  // dispatch
  handleDrop: PropTypes.func,
  pollSubmission: PropTypes.func
}
