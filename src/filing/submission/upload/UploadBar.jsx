import React, { Component } from 'react'
import { ProgressBar } from "./ProgressBar"

export class UploadBar extends Component {
  constructor(props) {
    super(props)
    this.SCALING_FACTOR = 1
    if (props.file) {
      this.SCALING_FACTOR = props.file.size / 1e6
      if (this.SCALING_FACTOR < 1) this.SCALING_FACTOR = 1
      if (this.SCALING_FACTOR > 5) this.SCALING_FACTOR = 5
    }
    const fillWidth = this.getSavedWidth(props.filingPeriod, props.lei) || 1
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
    // if (this.props.errorUpload || this.props.errorApp) width = 0
    localStorage.setItem(`HMDA_UPLOAD_PROGRESS/${filingPeriod}/${lei}`, JSON.stringify(width))
  }

  getSavedWidth(filingPeriod, lei) {
    return lei ? JSON.parse(localStorage.getItem(`HMDA_UPLOAD_PROGRESS/${filingPeriod}/${lei}`)) : 0
  }

  getNextWidth() {
    const fillWidth = this.state.fillWidth
    this.timeout = setTimeout(
      this.setNextWidth(fillWidth),
      this.SCALING_FACTOR * 200 * Math.pow(2, 50 / (100 - fillWidth))
    )
  }

  setNextWidth(currWidth) {
    return () => {
      this.timeout = null
      let nextWidth = parseInt(currWidth) + 1
      if (nextWidth > 100) nextWidth = '100'
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

  render() {
    return <ProgressBar percent={this.getFillWidth()} label='Upload' />
  }
}






















// const UploadBar = props => {
//   const [state, updateState] = useState({ fillWidth: '10', firstRender: true, scalingFactor: 1 })

//   const setState = obj => updateState(state => ({ ...state, ...obj }))

//   useEffect(() => {
//     if(state.firstRender) setState({ firstRender: false })
//   }, [state.firstRender])

//   useEffect(() => {
//     return function onUnmount() {
//       console.log('UploadBar will unmount')
//     }
//   }, [])

//   function getNextWidth() {
//     const fillWidth = state.fillWidth
//     setState({ timeout: setTimeout(
//       setNextWidth(fillWidth),
//       state.SCALING_FACTOR * 200 * Math.pow(2, 50 / (100 - fillWidth))
//     )})
//   }

//   function setNextWidth(currWidth) {
//     return () => {
//       state.timeout = null
//       let nextWidth = parseInt(currWidth) + 1
//       if (nextWidth > 100) nextWidth = '100'
//       setState({ fillWidth: nextWidth.toString() })
//     }
//   }

//   function getFillWidth() {
//     if(state.firstRender) return '0'
//     if (parseInt(state.fillWidth) > 100) return '100'
//     if (!props.uploading) return '100'
//     else if (!state.timeout) getNextWidth()

//     return state.fillWidth
//   }


//   console.log('First render: ', state.firstRender)
//   console.log('fillWidth: ', state.fillWidth)

//   return <ProgressBar percent={getFillWidth()} label='Upload' />
// }