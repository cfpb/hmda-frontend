import React, { Component } from 'react'
import ProgressBar from "./ProgressBar/"
import { STATUS } from './ProgressBar/constants'

const MIN_PCT = 10
export class UploadBar extends Component {
  constructor(props) {
    super(props)
    this.SCALING_FACTOR = 1
    if (props.file) {
      this.SCALING_FACTOR = props.file.size / 1e6
      if (this.SCALING_FACTOR < 1) this.SCALING_FACTOR = 1
      if (this.SCALING_FACTOR > 5) this.SCALING_FACTOR = 5
    }
    const fillWidth = this.getSavedWidth(props.filingPeriod, props.lei) || MIN_PCT
    this.state = { fillWidth, firstRender: true }
    this.setState = this.setState.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    this.timeout = null
  }

  componentDidMount() {
    if (this.state.firstRender) {
      const fillWidth = this.getSavedWidth(this.props.filingPeriod, this.props.lei)
      this.setState({ firstRender: false, fillWidth })
    }
  }

  saveWidth(filingPeriod, lei, width) {
    localStorage.setItem(`HMDA_UPLOAD_PROGRESS/${filingPeriod}/${lei}`, JSON.stringify(width))
  }

  getSavedWidth(filingPeriod, lei) {
    let storedValue = 0

    if (lei) {
      const itemKey = `HMDA_UPLOAD_PROGRESS/${filingPeriod}/${lei}`
      storedValue = JSON.parse(localStorage.getItem(itemKey))
    }

    return storedValue || MIN_PCT
  }

  getNextWidth() {
    const fillWidth = this.state.fillWidth
    this.timeout = setTimeout(
      this.setNextWidth(fillWidth),
      this.SCALING_FACTOR * 75 * Math.pow(2, 50 / (100 - fillWidth))
    )
  }

  setNextWidth(currWidth) {
    return () => {
      this.timeout = null
      let nextWidth = parseInt(currWidth) + 1
      if (nextWidth > 100) nextWidth = '100'
      if (nextWidth < MIN_PCT) nextWidth = `${MIN_PCT}`
      this.saveWidth(this.props.filingPeriod, this.props.lei, nextWidth)
      this.setState({ fillWidth: nextWidth })
    }
  }

  getFillWidth() {
    if (this.state.firstRender)
      return this.getSavedWidth(this.props.filingPeriod, this.props.lei)

    if (parseInt(this.state.fillWidth) > 100 || !this.props.uploading) {
      this.saveWidth(this.props.filingPeriod, this.props.lei, 0)
      return '100'
    }

    if (!this.timeout) this.getNextWidth()

    return this.state.fillWidth
  }

  status() {
    if(this.props.uploading) return STATUS.PROGRESS
    return STATUS.DONE
  }

  render() {
    return (
      <ProgressBar
        pct={this.getFillWidth()}
        status={this.status()}
        label='Upload'
      />
    )
  }
}