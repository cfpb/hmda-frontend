import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  SYNTACTICAL_VALIDITY_EDITS,
  NO_MACRO_EDITS
} from '../constants/statusCodes.js'

function mapStateToProps(state, ownProps) {
  if (!state || !state.app) return

  const { pathname } = ownProps.location
  const page = pathname.split('/').slice(-1)[0]
  const base = pathname
    .split('/')
    .slice(0, -1)
    .join('/')
  const { code } = state.app.submission.status
  const editsFetched = state.app.edits.fetched
  const qualityExists = !!state.app.edits.types.quality.edits.length
  const qualityVerified = state.app.edits.types.quality.verified
  const validationComplete =
    code === SYNTACTICAL_VALIDITY_EDITS || code >= NO_MACRO_EDITS

  return {
    page,
    base,
    code,
    editsFetched,
    validationComplete,
    qualityExists,
    qualityVerified
  }
}

export default component => {
  return withRouter(connect(mapStateToProps)(component))
}

export { mapStateToProps }
