import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchCSV from '../actions/fetchCSV.js'
import CSVDownload from './CSVDownload.jsx'
import * as AccessToken from '../api/AccessToken'
import {saveAs} from 'file-saver'

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
    // return e => {
    //   e.preventDefault()
    //   this.setState({ isFetching: true })
    //   dispatch(fetchCSV(lei, filing, submissionId)).then(() => {
    //     this.setState({ isFetching: false })
    //   })
    // }
    return () => {
      console.log('Filing: ', filing)
      let url = `/v2/filing/institutions/${lei}/filings/${filing}/submissions/${submissionId}/edits/csv?format=csv`
      let filename = `${lei}-${submissionId}-full-edit-report.csv`
      // let a = document.createElement('a')
      // a.href = url
      // a.setAttribute('download', filename)
      // a.click()
      // a = null

      console.log('Running "fetch" for ', url)
      fetch(url, {
        headers: {
          "Authorization": `Bearer ${AccessToken.get()}`,
          'Content-Type': 'text/csv'
        }
      }).then(res => {
        console.log('Response completed!')
        return res.blob()
      }).then(blob => {
        console.log('We have the Blob!')
        saveAs(blob, filename)
      })
    }
  }

  return { onDownloadClick }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSVContainer)
