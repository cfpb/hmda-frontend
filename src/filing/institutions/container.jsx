import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import getFilingPeriodOptions from '../actions/getFilingPeriodOptions'
import Institutions from './index.jsx'
import InstitutionDetailsWrapper from './details/InstitutionDetailsWrapper'
import { getKeycloak } from '../../common/api/Keycloak.js'
import { afterFilingPeriod, beforeFilingPeriod } from "../utils/date"
import { splitYearQuarter } from '../api/utils.js'

export class InstitutionContainer extends Component {
  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate(){
    this.fetchIfNeeded()
  }

  fetchIfNeeded() {
    const { dispatch, filingPeriod, institutions, filingPeriods, filingQuartersLate } = this.props
    // Fetching institition data without a filingPeriod results in an error that interferes with upload/filing
    if(!filingPeriod) return 

    if(!institutions.fetched && !institutions.isFetching){
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // Fetch Institutions associated with this Keycloak account
      let associatedInstitutions = leis.map((lei) => ({ lei }))
      dispatch(
        fetchEachInstitution(
          associatedInstitutions,
          filingPeriod,
          filingQuartersLate
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
    if(this.props.match.params.institution) 
      return <InstitutionDetailsWrapper {...this.props} />
      
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { institutions, filingPeriod, filings, submission, latestSubmissions, error, redirecting, filingPeriodOptions } = state.app
  const { filingPeriods, filingQuarters, filingQuartersLate } = ownProps.config
  const isQuarterly = Boolean(splitYearQuarter(filingPeriod)[1])
  const isPassedQuarter = isQuarterly && afterFilingPeriod(filingPeriod, filingQuartersLate)
  const isFutureQuarter = isQuarterly && beforeFilingPeriod(filingPeriod, filingQuarters)
  const isClosedQuarter = isQuarterly && (isPassedQuarter || isFutureQuarter)
  const selectedPeriod = ownProps.config.filingPeriodStatus[filingPeriod] || {}

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
    isPassedQuarter,
    isClosedQuarter,
    hasQuarterlyFilers: hasQuarterlyFilers(institutions),
    filingPeriodOptions,
    selectedPeriod, // FilingPeriodStatus
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
