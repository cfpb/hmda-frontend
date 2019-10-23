import { connect } from 'react-redux'
import Receipt from './Receipt.jsx'

export function mapStateToProps(state) {
  const { timestamp, receipt } = state.app.signature

  const { status } = state.app.submission
  // const { email } = state.app.user.oidc.profile

  const { filingPeriod } = state.app

  return {
    timestamp,
    receipt,
    status,
    filingPeriod
    // email
  }
}

export default connect(mapStateToProps)(Receipt)
