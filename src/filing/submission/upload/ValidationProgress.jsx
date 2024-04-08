import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ProgressTextComponent from './ProgressText.jsx'
import progressHOC from '../progressHOC.jsx'
import {
  PARSED_WITH_ERRORS,
  SYNTACTICAL_VALIDITY_EDITS,
  NO_MACRO_EDITS,
  UPLOADING,
} from '../../constants/statusCodes.js'
/* TODO
we may need to update this
we'll have to see what a clean file upload does
*/

import './ValidationProgress.css'

const ProgressText = progressHOC(ProgressTextComponent)

export default class ValidationProgress extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fillWidth: this.getSavedWidth(props.filingPeriod, props.lei),
    }
    this.SCALING_FACTOR = 1
    if (props.file) {
      this.SCALING_FACTOR = props.file.size / 1e6
      if (this.SCALING_FACTOR < 1) this.SCALING_FACTOR = 1
      if (this.SCALING_FACTOR > 5) this.SCALING_FACTOR = 5
    }
  }

  componentWillReceiveProps(props) {
    if (props.file) {
      this.SCALING_FACTOR = props.file.size / 1e6
      if (this.SCALING_FACTOR < 1) this.SCALING_FACTOR = 1
      if (this.SCALING_FACTOR > 5) this.SCALING_FACTOR = 5
    }
    if (props.lei !== this.props.lei) {
      this.setState({
        fillWidth: this.getSavedWidth(props.filingPeriod, props.lei),
      })
    }
  }

  getSavedWidth(filingPeriod, lei) {
    return lei
      ? +localStorage.getItem(`HMDA_FILE_PROGRESS/${filingPeriod}/${lei}`)
      : 0
  }

  saveWidth(filingPeriod, lei, width) {
    if (this.props.errorUpload || this.props.errorApp) width = 0
    localStorage.setItem(`HMDA_FILE_PROGRESS/${filingPeriod}/${lei}`, width)
  }

  isErrored() {
    return (
      this.props.code === PARSED_WITH_ERRORS ||
      this.props.errorUpload ||
      this.props.errorApp
    )
  }

  getFillError() {
    if (this.isErrored()) return 'error'
    return ''
  }

  getFillWidth() {
    let currWidth = this.state.fillWidth
    if (
      this.isErrored() ||
      this.props.code === SYNTACTICAL_VALIDITY_EDITS ||
      this.props.code >= NO_MACRO_EDITS
    ) {
      currWidth = 100
      this.saveWidth(this.props.filingPeriod, this.props.lei, 100)
    } else if (!this.timeout) this.getNextWidth()

    return currWidth
  }

  setNextWidth(currWidth) {
    return () => {
      this.timeout = null
      let nextWidth = currWidth + 1
      if (nextWidth > 100) nextWidth = 100
      this.saveWidth(this.props.filingPeriod, this.props.lei, nextWidth)
      this.setState({ fillWidth: nextWidth })
    }
  }

  getNextWidth() {
    const currWidth = this.state.fillWidth
    this.timeout = setTimeout(
      this.setNextWidth(currWidth),
      this.SCALING_FACTOR * 200 * Math.pow(2, 50 / (100 - currWidth)),
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    this.timeout = null
  }

  render() {
    const { code, errorApp, errorUpload, file, uploading } = this.props

    if (code < UPLOADING && !uploading) return null
    return (
      <section className='ValidationProgress'>
        {/* the background bar */}
        <div className='progressTotal' />
        {/* the progress bar */}
        <div
          className={`progressFill ${this.getFillError()}`}
          style={{ width: this.getFillWidth() + '%' }}
        />
        <ProgressText
          errorApp={errorApp}
          errorUpload={errorUpload}
          file={file}
        />
      </section>
    )
  }
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  errorApp: PropTypes.object,
  errorUpload: PropTypes.object,
  file: PropTypes.object,
  filingPeriod: PropTypes.string,
  lei: PropTypes.string,
  uploading: PropTypes.bool,
}
