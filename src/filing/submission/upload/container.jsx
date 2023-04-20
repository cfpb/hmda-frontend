import { connect } from 'react-redux'
import Upload from './index.jsx'
import handleFile from '../../actions/handleFile.js'
import pollForProgress from '../../actions/pollForProgress.js'
import listenForProgress from '../../actions/listenForProgress.js'

export function mapStateToProps(state) {
  const { lei, filingPeriod, submission, processProgress }= state.app
  const code = submission.status.code
  const filename = submission.filename

  const { uploading, file, errors, errorFile, errorUpload } =
    state.app.upload[lei] || state.app.upload['__DEFAULT_UPLOAD__']

  const errorApp = state.app.error

  return {
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
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    handleDrop(acceptedFiles, code, error) {
      if (!acceptedFiles) return
      dispatch(handleFile(acceptedFiles[0], code, error))
    },
    pollSubmission() {
      dispatch(pollForProgress())
    },
    watchProgress() {
      dispatch(listenForProgress())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload)
