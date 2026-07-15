import PropTypes from 'prop-types'
import { Component } from 'react'
import Dropzone from 'react-dropzone'
import Alert from '../../../common/Alert.jsx'
import {
  MACRO_EDITS,
  NO_MACRO_EDITS,
  PARSED_WITH_ERRORS,
  SYNTACTICAL_VALIDITY_EDITS,
  UPLOADING,
  VALIDATED,
} from '../../constants/statusCodes.js'
import DropzoneContent from './DropzoneContent.jsx'
import ValidationProgress from './ValidationProgress.jsx'

import './UploadForm.css'

export default class Upload extends Component {
  constructor(props) {
    super(props)

    // handle the onDrop to set the file and show confirmation modal
    this.onDrop = (acceptedFiles) => {
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
    } = this.props

    return (
      <section className='UploadForm'>
        {/*
          something is wrong with the file
          detected by the front-end
        */}
        {errors.length > 0 ? (
          <Alert heading='Sorry, your file has errors.' type='error'>
            <ul>
              {errors.map((error, i) => {
                return <li key={i}>{error}</li>
              })}
            </ul>
          </Alert>
        ) : null}
        <h2>Step 1 of 5: Upload Loan Application Register (LAR)</h2>
        <p>
          Use this page to upload your institution’s Loan Application Register
          file for HMDA submission. After uploading, the system will validate
          the file format and check for any edits or potential errors that may
          need review before filing.
        </p>
        <h4 id='file-requirements'>Your file must:</h4>
        <ul aria-labelledby='file-requirements' className='bulleted-list'>
          <li>Be a valid (.txt) file format</li>
          <li>
            Follow the most current HMDA filing instructions guide formatting
            requirements
          </li>
          <li>Contain pipe-delimited data</li>
        </ul>
        <h4 id='upload-tips'>Upload tips:</h4>
        <ul aria-labelledby='upload-tips' className='bulleted-list'>
          <li>Excel, CSV, PDF, and ZIP files are not currently accepted</li>
          <li>Large files may take several minutes to process</li>
          <li>After upload, review any edits before submission</li>
        </ul>
        <Dropzone
          disablePreview
          onDrop={this.onDrop}
          multiple={false}
          disabled={this.props.isPassed}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <DropzoneContent
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                code={code}
                errorFile={errorFile}
                filename={filename}
                isDisabled={this.props.isPassed}
              />
            )
          }}
        </Dropzone>
        <ValidationProgress
          code={code}
          errorApp={errorApp}
          errorUpload={errorUpload}
          file={file}
          filingPeriod={filingPeriod}
          lei={lei}
          uploading={uploading}
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
  pollSubmission: PropTypes.func,
}
