import React from 'react'
import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import { selectFile, triggerParse } from '../actions'
import checkFileErrors from '../../../filing/utils/checkFileErrors.js'

export function mapStateToProps(state) {
  const { uploading, file, errors } = state.app.upload || {
    uploading: false,
    file: null,
    errors: [],
  }

  const filingPeriod = state.app.filingPeriod || null
  const parseErrors = state.app.parseErrors || {
    transmittalSheetErrors: [],
    larErrors: [],
  }
  const errorCount =
    parseErrors.transmittalSheetErrors.length + parseErrors.larErrors.length

  return {
    uploading,
    file,
    filingPeriod,
    errors,
    parseErrors: { ...parseErrors, errorCount },
  }
}

function setAndParseFile(file) {
  return (dispatch, getState) => {
    const handleErrors = (fileErrors) => {
      // Save client-side validation errors, whose presence will halt backend processing
      dispatch(selectFile(file, fileErrors))

      // Submit file for backend parsing only if all client-side validations pass
      if (getState().app.upload.errors.length === 0) {
        dispatch(triggerParse(file))
      }
    }

    checkFileErrors(file, handleErrors, 'ffvt')
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setFile: (acceptedFiles, rejectedFiles) => {
      if (!acceptedFiles || !rejectedFiles) return
      let file = acceptedFiles[0] || rejectedFiles[0]
      if (!file) return
      dispatch(setAndParseFile(file))
    },
  }
}

const UploadButton = (props) => {
  const text = props.text || 'Upload file'

  const handleSelection = (event) => {
    if (!event || !event.target.files) return
    props.setFile(event.target.files, [])
  }

  return (
    <>
      <input id='uploadFileInput' type='file' onChange={handleSelection} />
      <button
        id='uploadFileButton'
        type='button'
        onClick={() => document.getElementById('uploadFileInput').click()}
      >
        {text}
      </button>
    </>
  )
}

export const ConnectedUploadButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadButton)
export default connect(mapStateToProps, mapDispatchToProps)(Upload)
