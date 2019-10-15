import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './index.jsx'
import InstitutionsContainer from '../institutions/container.jsx'

export class HomeContainer extends Component {
  render() {
    if (this.props.user === null) return (
      <Home
        pathname={this.props.location.pathname}
        filingPeriod={this.props.params.filingPeriod}
      />
    )
    return <InstitutionsContainer />
  }
}

export function mapStateToProps(state) {
  return {
    user: state.app.user.oidc
  }
}

export default connect(mapStateToProps)(HomeContainer)
