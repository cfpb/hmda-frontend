import React, { Component } from 'react'
import { connect } from 'react-redux'
import ParseErrors from '../components/ParseErrors.jsx'

class ParseErrorsContainer extends Component {
  render() {
    return <ParseErrors {...this.props} />
  }
}

function mapStateToProps(state) {
  const { isParsing, parsed, transmittalSheetErrors, larErrors } =
    state.app.parseErrors

  const { errors } = state.app.upload

  const { pagination, filingPeriod } = state.app

  return {
    isParsing,
    parsed,
    transmittalSheetErrors,
    larErrors,
    pagination,
    errors,
    filingPeriod,
  }
}

export default connect(mapStateToProps)(ParseErrorsContainer)
