import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilingPeriodSelector from '../components/FilingPeriodSelector'
import { setFilingPeriod } from '../actions'

class FilingPeriodSelectorContainer extends Component {
  render() {
    return <FilingPeriodSelector {...this.props} />
  }
}

function mapStateToProps(state) {
  const filingPeriod = state.app.filingPeriod

  return {
    filingPeriod
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: e => {
      dispatch(setFilingPeriod(e.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FilingPeriodSelectorContainer
)
