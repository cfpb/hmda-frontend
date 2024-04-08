import React, { Component } from 'react'
import { connect } from 'react-redux'
import requestInstitutions from '../actions/requestInstitutions.js'
import fetchEachInstitution from '../actions/fetchEachInstitution.js'
import getFilingPeriodOptions from '../actions/getFilingPeriodOptions'
import Institutions from './index.jsx'
import InstitutionDetailsWrapper from './details/InstitutionDetailsWrapper'
import { getKeycloak } from '../../common/api/Keycloak.js'
import { Redirect } from 'react-router-dom'
import * as AccessToken from '../../common/api/AccessToken'
import jwtDecode from 'jwt-decode'
import { shouldFetchInstitutions } from '../actions/shouldFetchInstitutions.js'

export class InstitutionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldRedirect: false,
    }
  }

  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate(prevProps) {
    this.fetchIfNeeded()
    const { user } = this.props
    if (user?.userInfo?.tokenParsed !== prevProps.user?.userInfo?.tokenParsed) {
      if (
        !("lei" in user?.userInfo?.tokenParsed) || user?.userInfo?.tokenParsed?.lei == ''
      ) {
        this.setState({ shouldRedirect: true })
      }
    }
  }

  fetchIfNeeded() {
    const { dispatch, institutions, selectedPeriod } = this.props
    // Fetching institition data without a filingPeriod results in an error that interferes with upload/filing
    if (!selectedPeriod || !selectedPeriod.period) return

    // shouldFetchInstitutions flag gets set in CompleteProfile component
    if (institutions.shouldFetchInstitutions) {
      dispatch(requestInstitutions())
      // Decode fresh token which contains the most up to date lei
      let leiFromNewToken = jwtDecode(AccessToken.get())
      const leiString = leiFromNewToken.lei
      const leis = leiString ? leiString.split(',') : []

      // Fetch Institutions associated with this Keycloak account
      let associatedInstitutions = leis.map((lei) => ({ lei }))
      dispatch(fetchEachInstitution(associatedInstitutions, selectedPeriod))

      // Determine which filing periods to make available to the user
      dispatch(
        getFilingPeriodOptions(
          associatedInstitutions,
          this.props.config.filingPeriodStatus,
        ),
      )
      // Reset flag after fetch
      dispatch(shouldFetchInstitutions(false))
    }
    if (!institutions.fetched && !institutions.isFetching) {
      dispatch(requestInstitutions())
      const leiString = getKeycloak().tokenParsed.lei
      const leis = leiString ? leiString.split(',') : []

      // Fetch Institutions associated with this Keycloak account
      let associatedInstitutions = leis.map((lei) => ({ lei }))
      dispatch(fetchEachInstitution(associatedInstitutions, selectedPeriod))

      // Determine which filing periods to make available to the user
      dispatch(
        getFilingPeriodOptions(
          associatedInstitutions,
          this.props.config.filingPeriodStatus,
        ),
      )
    }
  }

  render() {
    // Redirect user to profile page if they don't have any LEIs associated with their account
    if (this.state.shouldRedirect) {
      return <Redirect to='/filing/profile' />
    }

    if (this.props.match.params.institution)
      return <InstitutionDetailsWrapper {...this.props} />

    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state, _ownProps) {
  const {
    institutions,
    filingPeriod,
    filings,
    submission,
    latestSubmissions,
    error,
    redirecting,
    filingPeriodOptions,
    user,
  } = state.app

  return {
    submission,
    filingPeriod,
    institutions,
    filings,
    error,
    shouldFetchInstitutions: state.app.institutions.shouldFetchInstitutions,
    latestSubmissions: latestSubmissions.latestSubmissions,
    redirecting,
    hasQuarterlyFilers: hasQuarterlyFilers(institutions),
    filingPeriodOptions,
    user: user,
  }
}

function hasQuarterlyFilers(institutionState) {
  if (institutionState.fetched) {
    const institutions = institutionState.institutions
    const institutionsList = Object.keys(institutions).map(
      (key) => institutions[key],
    )
    const isQFList = institutionsList.map((i) =>
      i.isFetching ? true : i.quarterlyFiler,
    )
    return isQFList.some((i) => i)
  }

  return true
}

export default connect(mapStateToProps)(InstitutionContainer)
