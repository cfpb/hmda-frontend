import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './index.jsx'
import InstitutionsContainer from '../institutions/container.jsx'

export class HomeContainer extends Component {
  
  render() {
    if (this.props.user === null || this.props.maintenanceMsg) return (
      <Home
        pathname={this.props.location.pathname}
        filingPeriod={this.props.match.params.filingPeriod}
        filingYears={this.props.filingPeriods}
        maintenanceMsg={this.props.maintenanceMsg}
      />
    )
    return <InstitutionsContainer />
  }
}

export function mapStateToProps(state, ownProps) {
  return {
    user: state.app.user.oidc,
    filingPeriods: ownProps.config.filingPeriods,
    maintenanceMsg: ownProps.config.maintenanceMsg
  }
}

export default connect(mapStateToProps)(HomeContainer)
