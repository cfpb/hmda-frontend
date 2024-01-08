import React, { Component } from 'react'
import { connect } from 'react-redux'
import clearUserError from '../../actions/clearUserError.js'
import LoggedOutModal from './index.jsx'

export class LoggedOutContainer extends Component {
  render() {
    return <LoggedOutModal clearErrorModal={this.props.clearErrorModal} />
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    clearErrorModal() {
      dispatch(clearUserError())
    },
  }
}

export default connect(null, mapDispatchToProps)(LoggedOutContainer)
