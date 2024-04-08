import React, { Component } from 'react'
import fileSaver from 'file-saver'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import Alert from '../../common/Alert.jsx'
import { isCI } from '../../common/environmentChecks'
import Heading from '../../common/Heading.jsx'
import runFetch from './runFetch.js'

import './CSVUpload.css'

const defaultState = {
  isFetching: false,
  filename: '',
  error: false,
}

class CSVUpload extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleCSVSelect = this.handleCSVSelect.bind(this)

    this.refScrollTo = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isFetching) {
      window.scrollTo({
        top: this.refScrollTo.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  onCSVFetch() {
    this.setState({ isFetching: true, error: false })
  }

  onCSVCalculated(response, file) {
    if (response.status) {
      return this.setState({
        isFetching: false,
        error: true,
      })
    }

    const filename = 'calculated-' + file.name

    this.setState({
      isFetching: false,
      filename: filename,
    })

    return fileSaver.saveAs(
      new Blob([response], { type: 'text/csv;charset=utf-16' }),
      filename,
    )
  }

  handleCSVSelect(event) {
    event.preventDefault()
    const file = event.target.files[0]
    if (!file) return

    event.target.value = null

    this.onCSVFetch()
    const CSV_URL = '/public/rateSpread/csv'
    runFetch(CSV_URL, this.prepareCSVBody(file), true).then((res) => {
      this.onCSVCalculated(res, file)
    })
  }

  prepareCSVBody(file) {
    const data = new FormData()
    data.append('file', file)
    return data
  }

  render() {
    return (
      <div className='CSVUpload'>
        <div className='Form'>
          <Heading
            type={3}
            headingText='Upload a CSV file'
            paragraphText='You can also upload a csv to calculate many rate spreads at once.'
          />
          <p>
            <input
              onChange={this.handleCSVSelect}
              type='file'
              href='#'
              id='csvfile'
            />
            <label className='button csvLabel' htmlFor='csvfile'>
              Upload a csv
            </label>
          </p>
          <p className='text-small'>
            Please see{' '}
            <a
              href='https://ffiec.cfpb.gov/documentation/api/rate-spread/#batch-ratespreads'
              target='_blank'
            >
              the batch section of the API documentation
            </a>{' '}
            for information on csv formatting.
          </p>
        </div>
        <div ref={this.refScrollTo}>
          {this.state.isFetching ? (
            <LoadingIcon className='LoadingInline' />
          ) : this.state.error ? (
            <Alert
              type='error'
              heading='Sorry, an error has occurred processing your file.'
            >
              <p>
                Please check your file format and try again later. If the
                problem persists, contact{' '}
                <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.
              </p>
            </Alert>
          ) : this.state.filename ? (
            <Alert
              type='success'
              heading='Batch rate spread calculation complete'
            >
              <p>
                Downloaded <strong>{this.state.filename}</strong> with your
                batch results.
              </p>
            </Alert>
          ) : null}
        </div>
      </div>
    )
  }
}

export default CSVUpload
