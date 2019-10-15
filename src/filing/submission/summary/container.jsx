import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchSummary from '../../actions/fetchSummary.js'
import Summary from './index.jsx'

export class SummaryContainer extends Component {
  componentDidMount() {
    if (
      !Object.keys(this.props.submission).length &&
      !Object.keys(this.props.ts).length
    ) {
      this.props.dispatch(fetchSummary())
    }
  }

  render() {
    return <Summary {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { isFetching, submission, ts } = state.app.summary

  return {
    isFetching,
    submission,
    ts
  }
}

export default connect(mapStateToProps)(SummaryContainer)
