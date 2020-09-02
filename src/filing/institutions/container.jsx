import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import getFilingPeriodOptions from '../actions/getFilingPeriodOptions'
import Institutions from './index.jsx'
import InstitutionDetailsWrapper from './details/InstitutionDetailsWrapper'
import { getKeycloak } from '../utils/keycloak.js'
import { afterFilingPeriod, beforeFilingPeriod } from "../utils/date"
import { splitYearQuarter } from '../api/utils.js'

export class InstitutionContainer extends Component {
  constructor(props){
    super(props)
    this.state = { selected: null }
    this.setSelected = this.setSelected.bind(this)
  }

  componentDidMount() {
    this.fetchIfNeeded()
    this.updateUrlIfNeeded()
  }

  componentDidUpdate(){
    this.fetchIfNeeded()
    this.updateUrlIfNeeded()
  }

  fetchIfNeeded() {
    const { dispatch, filingPeriod, institutions, filingPeriods, filingQuartersLate } = this.props
    // Fetching institition data without a filingPeriod results in an error that interferes with upload/filing
    if(!filingPeriod) return 

    if(!institutions.fetched && !institutions.isFetching){
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // create the expected objects from the array, institutions = [{lei: lei}]
      let instArr = leis.map(lei => ({ lei }))
      dispatch(fetchEachInstitution(instArr, filingPeriod, filingQuartersLate))
      dispatch(getFilingPeriodOptions(instArr, filingPeriods))
    }
  }

  updateUrlIfNeeded(){
    if (window.location.pathname.match(/details$/) && !this.state.selected)
      this.props.history.replace(this.props.match.url)
  }

  setSelected(selected) {
    this.setState({ selected })
  }

  render() {
    const { selected } = this.state
    
    if(selected) 
      return (
        <InstitutionDetailsWrapper
          {...this.props}
          close={() => this.setSelected(null)}
          selected={selected}
        />
      )
      
    return <Institutions {...this.props} setSelected={this.setSelected} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { institutions, filingPeriod, filings, submission, latestSubmissions, error, redirecting, filingPeriodOptions } = state.app
  const { filingPeriods, filingQuarters, filingQuartersLate } = ownProps.config
  const isQuarterly = Boolean(splitYearQuarter(filingPeriod)[1])
  const isPassedQuarter = isQuarterly && afterFilingPeriod(filingPeriod, filingQuartersLate)
  const isFutureQuarter = isQuarterly && beforeFilingPeriod(filingPeriod, filingQuarters)
  const isClosedQuarter = isQuarterly && (isPassedQuarter || isFutureQuarter)

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
    filingPeriodOptions
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
