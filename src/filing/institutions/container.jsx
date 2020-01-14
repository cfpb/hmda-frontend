import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import receiveInstitutions from '../actions/receiveInstitutions.js'
import Institutions from './index.jsx'
import { getKeycloak } from '../utils/keycloak.js'
import { splitYearQuarter } from '../api/utils.js'
import Loading from '../../common/LoadingIcon.jsx'
import isRedirecting from '../actions/isRedirecting'
// import { SET_FILING_PERIOD } from '../constants/index'

export class InstitutionContainer extends Component {
  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate(){
    this.fetchIfNeeded()
  }

  fetchIfNeeded() {
    const { dispatch, filingPeriod, institutions, match, selectionPeriods, redirecting } = this.props

    // TODO:
    // This method of redirect cycles through four page loads, which will waste a lot of resources.
    // Using history.pushState with a dispatch to update filingPeriod doesn't trigger a component update...
    if (this.shouldBeQuarterly()) {
      const latestQtr = selectionPeriods.periods.map(s => splitYearQuarter(s)[1]).filter(x => x).sort().reverse()[0]
      const targetPeriod = `${match.params.filingPeriod}-${latestQtr}`

      if (latestQtr && filingPeriod !== targetPeriod) {
        dispatch(isRedirecting(true))

        // * Works but results in too many page reloads
        window.location = match.path.replace(':filingPeriod', targetPeriod)
        return

        // * Updates the store and the location bar but does not pass down the updated filingPeriod or redirected values from the Store
        // window.history.pushState('','',match.path.replace(':filingPeriod', targetPeriod))
        // return dispatch({ type: SET_FILING_PERIOD, filingPeriod: targetPeriod })

        // * Also tried to force a re-render but that didn't fix anything 
        // this.forceUpdate()
      }
    }

    if(redirecting) {
      console.log('redirecting')
      console.log('filingPeriod: ', filingPeriod)
      console.log('match: ', match.params.filingPeriod)
      return
    }

    if (!institutions.fetched && !institutions.isFetching){
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // create the expected objects from the array, institutions = [{lei: lei}]
      let instArr = leis.map(lei => ({ lei }))
      dispatch(fetchEachInstitution(instArr, filingPeriod, !this.shouldBeQuarterly()))
      dispatch(receiveInstitutions())
    }
  }
  

  shouldBeQuarterly(){
    const { filingYears, filingPeriod } = this.props
    const [year, quarter] = splitYearQuarter(filingPeriod)
    
    // Filing year is not open for annual submissions but
    // the url does not yet reflect that this should be quarterly
    return filingYears.indexOf(year) < 0 && !quarter
  }

  render() {
    if(this.shouldBeQuarterly() && !this.props.error)
      return (
        <div style={{ height: '100px' }}>
          <Loading className="floatingIcon" />
        </div>
      )

    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { institutions, filings, submission, latestSubmissions, error, selectionPeriods, redirecting } = state.app
  const { filingPeriod } = ownProps.match.params
  const filingYears = ownProps.config.filingPeriods

  return {
    submission,
    filingPeriod,
    filingYears,
    institutions,
    filings,
    error,
    latestSubmissions: latestSubmissions.latestSubmissions,
    selectionPeriods,
    redirecting
  }
}

export default connect(mapStateToProps)(InstitutionContainer)
