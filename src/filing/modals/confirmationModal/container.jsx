import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import hideConfirm from '../../actions/hideConfirm.js'
import startRefile from '../../actions/startRefile.js'
import refileReady from '../../actions/refileReady.js'
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
  const institution =
    lei &&
    state.app.institutions.fetched &&
    state.app.institutions.institutions[lei]

  return {
    lei,
    filingPeriod,
    code,
    showing,
    newFile,
    institution,
  }
}

export function mapDispatchToProps(dispatch, ownProps) {
  const hideConfirmModal = () => {
    dispatch(hideConfirm())
  }

  const triggerRefile = (lei, period, page = '', file) => {
    dispatch(startRefile())
    dispatch(refreshState())
    if (page === 'upload' && file) {
      checkFileErrors(file, (fileErrors) => {
        if (fileErrors.length) {
          dispatch(refileReady())
          return dispatch(processFileErrors(fileErrors, file.name))
        }
        return dispatch(fetchNewSubmission(lei, period)).then(() => {
          dispatch(selectFile(file))
          dispatch(fetchUpload(file))
          dispatch(refileReady())
        })
      })
    } else {
      return dispatch(fetchNewSubmission(lei, period)).then(() => {
        const pathname = `/filing/${period}/${lei}/upload`
        if (page === 'institutions') ownProps.history.push(pathname)
        else ownProps.history.replace(pathname)
        dispatch(refileReady())
      })
    }
  }

  return {
    hideConfirmModal,
    triggerRefile,
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal),
)
