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
    const { dispatch, filingPeriod, filingQuarters, institutions } = this.props

    if(!institutions.fetched && !institutions.isFetching){
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // create the expected objects from the array, institutions = [{lei: lei}]
      let instArr = leis.map(lei => ({ lei }))
      dispatch(fetchEachInstitution(instArr, filingPeriod, filingQuarters))
    }
  }

  render() {
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { institutions, filingPeriod, filings, submission, latestSubmissions, error, redirecting } = state.app
  const { filingPeriods, filingQuarters, filingQuartersLate } = ownProps.config

  return {
    submission,
    filingPeriod,
    filingPeriods,
    filingQuarters,
    filingQuartersLate,
    institutions,
    filings,
    error,
    latestSubmissions: latestSubmissions.latestSubmissions,
    redirecting,
    hasQuarterlyFilers: hasQuarterlyFilers(institutions)
  }
}

function hasQuarterlyFilers(institutionState){
  if(institutionState.fetched){
    const institutions = institutionState.institutions
    const institutionsList = Object.keys(institutions).map(key => institutions[key])
    const isQFList = institutionsList.map(i => i.isFetching ? false : i.quarterlyFiler)
    return isQFList.some(i => i)
  }

  return false
}

export default connect(mapStateToProps)(InstitutionContainer)
