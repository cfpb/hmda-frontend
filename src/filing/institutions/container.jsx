import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import receiveInstitutions from '../actions/receiveInstitutions.js'
import Institutions from './index.jsx'
import { getKeycloak } from '../utils/keycloak.js'
// import { separateYearQuarter } from '../api/utils.js'

export class InstitutionContainer extends Component {
  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate(){
    this.fetchIfNeeded()
  }

  fetchIfNeeded() {
    const { dispatch, filingPeriod, institutions } = this.props
    if (!institutions.fetched && !institutions.isFetching){
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // create the expected objects from the array, institutions = [{lei: lei}]
      let instArr = []
      leis.forEach(lei => {
        instArr.push({ lei: lei })
      })
      // TODO:
      // If backend were to send all filings for the year (including quarterly) we already filter for latest filing by filingPeriod, so that should work well.
      // When fetching Annual
      //    we can update the store with a list of available PAST filing periods.
      // When requesting a quarterly filingPeriod (i.e. 2020-Q1)
      //    we can request Annaul if the list of PAST filing periods is not already populated
      dispatch(fetchEachInstitution(instArr, filingPeriod))
      dispatch(receiveInstitutions())
    }
  }

  render() {
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { institutions, filings, submission, latestSubmissions, error } = state.app
  const { filingPeriod } = ownProps.match.params
  const filingYears = ownProps.config.filingPeriods
    // const [filingYear, quarter] = separateYearQuarter(filingPeriod)

  return {
    submission,
    filingPeriod,
    filingYears,
    // filingYear,
    // quarter,
    institutions,
    filings,
    error,
    latestSubmissions: latestSubmissions.latestSubmissions
  }
}

export default connect(mapStateToProps)(InstitutionContainer)
