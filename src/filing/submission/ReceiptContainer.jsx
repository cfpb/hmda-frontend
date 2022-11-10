import { connect } from 'react-redux'
import Receipt from './Receipt.jsx'

export function mapStateToProps(state) {
  const { timestamp, receipt, email } = state.app.signature

  const { status } = state.app.submission

  const { filingPeriod } = state.app

  return {
    timestamp,
    receipt,
    status,
    filingPeriod,
    email,
  }
}

export default connect(mapStateToProps)(Receipt)
