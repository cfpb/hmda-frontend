import { connect } from 'react-redux'
import {
  SYNTACTICAL_VALIDITY_EDITS,
  NO_MACRO_EDITS
} from '../constants/statusCodes.js'

function mapStateToProps(state) {
  if (!state || !state.routing || !state.app) return

  const pathname = state.routing.locationBeforeTransitions.pathname
  const page = pathname.split('/').slice(-1)[0]
  const base = pathname
    .split('/')
    .slice(0, -1)
    .join('/')

  const { code, qualityVerified } = state.app.submission.status
  const editsFetched = state.app.edits.fetched
  const qualityExists = !!state.app.edits.types.quality.edits.length
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
  return connect(mapStateToProps)(component)
}

export { mapStateToProps }
