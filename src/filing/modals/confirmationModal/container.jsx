import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import hideConfirm from '../../actions/hideConfirm.js'
import fetchNewSubmission from '../../actions/fetchNewSubmission.js'
import refreshState from '../../actions/refreshState.js'
import selectFile from '../../actions/selectFile.js'
import fetchUpload from '../../actions/fetchUpload.js'
import processFileErrors from '../../actions/processFileErrors.js'
import checkFileErrors from '../../utils/checkFileErrors.js'
import ConfirmationModal from './index.jsx'

export function mapStateToProps(state) {
  const lei = state.app.lei
  const { showing } = state.app.confirmation
  const { filingPeriod } = state.app
  const { code } = state.app.submission.status
  const { newFile } =
    state.app.upload[lei] || state.app.upload['__DEFAULT_UPLOAD__']

  return {
    lei,
    filingPeriod,
    code,
    showing,
    newFile
  }
}

export function mapDispatchToProps(dispatch) {
  const hideConfirmModal = () => {
    dispatch(hideConfirm())
  }

  const triggerRefile = (lei, period, page = '', file) => {
    dispatch(refreshState())
    if (page === 'upload' && file) {
      const fileErrors = checkFileErrors(file)
      if (fileErrors.length)
        return dispatch(processFileErrors(fileErrors, file.name))

      return dispatch(fetchNewSubmission(lei, period)).then(() => {
        dispatch(selectFile(file))
        dispatch(fetchUpload(file))
      })
    } else {
      return dispatch(fetchNewSubmission(lei, period)).then(() => {
        browserHistory.replace(`/filing/${period}/${lei}/upload`)
      })
    }
  }

  return {
    hideConfirmModal,
    triggerRefile
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationModal)
