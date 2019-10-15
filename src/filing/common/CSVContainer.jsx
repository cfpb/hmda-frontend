import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchCSV from '../actions/fetchCSV.js'
import CSVDownload from './CSVDownload.jsx'

export class CSVContainer extends Component {
  constructor() {
    super()
    this.state = { isFetching: false }
  }
  render() {
    return (
      <CSVDownload
        {...this.props}
        onDownloadClick={this.props.onDownloadClick.bind(this)}
        isFetching={this.state.isFetching}
      />
    )
  }
}

export function mapStateToProps(state, ownProps) {
  const submission = ownProps.submission || state.app.submission

  return { submission }
}

export function mapDispatchToProps(dispatch) {
  // triggered by a click on "Download edit report"
  const onDownloadClick = function(lei, filing, submissionId) {
    return e => {
      e.preventDefault()
      this.setState({ isFetching: true })
      dispatch(fetchCSV(lei, filing, submissionId)).then(() => {
        this.setState({ isFetching: false })
      })
    }
  }

  return { onDownloadClick }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSVContainer)
