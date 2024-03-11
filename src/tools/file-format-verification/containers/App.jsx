import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AppContainer extends Component {
  render() {
    return <div className='AppContainer'>{this.props.children}</div>
  }
}

export default connect()(AppContainer)
