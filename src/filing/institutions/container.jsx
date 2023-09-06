import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import getFilingPeriodOptions from '../actions/getFilingPeriodOptions'
import Institutions from './index.jsx'
import InstitutionDetailsWrapper from './details/InstitutionDetailsWrapper'
import { getKeycloak } from '../../common/api/Keycloak.js'
import { Redirect } from 'react-router-dom'

export class InstitutionContainer extends Component {
  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate(){
    this.fetchIfNeeded()
  }

  fetchIfNeeded() {
    const { dispatch, institutions, selectedPeriod } = this.props
    // Fetching institition data without a filingPeriod results in an error that interferes with upload/filing
    if (!selectedPeriod || !selectedPeriod.period) return

    if(!institutions.fetched && !institutions.isFetching){
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // Fetch Institutions associated with this Keycloak account
      let associatedInstitutions = leis.map((lei) => ({ lei }))
      dispatch(
        fetchEachInstitution(
          associatedInstitutions,
          selectedPeriod
        )
      )

      // Determine which filing periods to make available to the user
      dispatch(
        getFilingPeriodOptions(
          associatedInstitutions,
          this.props.config.filingPeriodStatus
        )
      )
    }
  }

  render() {
    const { user } = this.props

    // Redirect user to profile page if they don't any LEIs associated with their account
    if (user?.userInfo?.tokenParsed?.lei == "") {
      return <Redirect to='/filing/profile' />
    }

    if(this.props.match.params.institution) 
      return <InstitutionDetailsWrapper {...this.props} />
      
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state, _ownProps) {
  const { institutions, filingPeriod, filings, submission, latestSubmissions, error, redirecting, filingPeriodOptions, user } = state.app

  return {
    submission,
    filingPeriod,
    institutions,
    filings,
    error,
    latestSubmissions: latestSubmissions.latestSubmissions,
    redirecting,
    hasQuarterlyFilers: hasQuarterlyFilers(institutions),
    filingPeriodOptions,
    user: user
  }
}

function hasQuarterlyFilers(institutionState){
  if(institutionState.fetched){
    const institutions = institutionState.institutions
    const institutionsList = Object.keys(institutions).map(key => institutions[key])
    const isQFList = institutionsList.map(i => i.isFetching ? true : i.quarterlyFiler)
    return isQFList.some(i => i)
  }

  return true
}

export default connect(mapStateToProps)(InstitutionContainer)
