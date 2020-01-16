import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import Institutions from './index.jsx'
import { getKeycloak } from '../utils/keycloak.js'

export class InstitutionContainer extends Component {
  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate(){
    this.fetchIfNeeded()
  }

  fetchIfNeeded() {
    const { dispatch, filingPeriod, institutions } = this.props

    if(!institutions.fetched && !institutions.isFetching){
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // create the expected objects from the array, institutions = [{lei: lei}]
      let instArr = leis.map(lei => ({ lei }))
      dispatch(fetchEachInstitution(instArr, filingPeriod))
    }
  }

  render() {
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { institutions, filingPeriod, filings, submission, latestSubmissions, error, selectionPeriods, redirecting } = state.app
  const { filingPeriods } = ownProps.config

  return {
    submission,
    filingPeriod,
    filingPeriods,
    institutions,
    filings,
    error,
    latestSubmissions: latestSubmissions.latestSubmissions,
    selectionPeriods,
    redirecting
  }
}

export default connect(mapStateToProps)(InstitutionContainer)
