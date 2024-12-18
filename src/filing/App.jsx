import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from './modals/confirmationModal/container.jsx'
import BrowserBlocker from './common/BrowserBlocker.jsx'
import Loading from '../common/LoadingIcon.jsx'
import * as AccessToken from '../common/api/AccessToken.js'
import { refresh, login } from './utils/keycloak.js'
import { getKeycloak, initKeycloak } from '../common/api/Keycloak.js'
import isRedirecting from './actions/isRedirecting.js'
import updateFilingPeriod from './actions/updateFilingPeriod.js'
import { detect } from 'detect-browser'
import { FilingAnnouncement } from './common/FilingAnnouncement'
import { splitYearQuarter } from './api/utils.js'
import { PERIODS } from '../deriveConfig'
import { ShowUserName } from '../common/ShowUserName'
import 'normalize.css'
import './app.css'
import '../common/Header.css'

const browser = detect()

const AppContainer = ({
  children,
  dispatch,
  config,
  maintenanceMode,
  redirecting,
  filingPeriod,
  selectedPeriod,
  history,
  location,
  match,
}) => {
  const [keycloakConfigured, setKeycloakConfigured] = useState(false)
  const [authenticationAttempted, setAuthenticationAttempted] = useState(false)

  const isOldBrowser = () => {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  const isHome = () => {
    return !!location.pathname.match(/^\/filing\/\d{4}(-Q\d)?\/$/)
  }

  const isPeriodReachable = (period) => {
    if (period === '2017') return true // We display a special message for 2017
    const guards = config.filingPeriodStatus
    const current = guards[period]
    return current && current.isVisible
  }

  const redirectToDefaultPeriod = (previous) => {
    const defaultPeriod = config.defaultPeriod
    dispatch(updateFilingPeriod(defaultPeriod))
    history.replace(location.pathname.replace(previous, defaultPeriod))
  }

  const redirectToReachablePeriod = (period) => {
    const quarters = PERIODS.filter((p) => p.includes('Q')).map(
      (period) => '-' + period,
    )
    const [year, _quarter] = splitYearQuarter(period)

    // Try to redirect to the latest Quarterly period
    for (let i = 0; i < quarters.length; i++) {
      const fp = year + quarters[i]
      if (isPeriodReachable(fp)) {
        dispatch(updateFilingPeriod(fp))
        history.replace(location.pathname.replace(period, fp))
        return
      }
    }

    // If we can't find a reachable Quarter, fall back to the default filing period
    redirectToDefaultPeriod(period)
  }

  useEffect(() => {
    const initializeKeycloak = async () => {
      if (maintenanceMode && !isHome()) {
        return history.push('/filing')
      }

      const currentFilingPeriod = match.params.filingPeriod

      if (!location.pathname.includes('/profile')) {
        if (isPeriodReachable(currentFilingPeriod)) {
          dispatch(updateFilingPeriod(currentFilingPeriod))
        } else {
          redirectToReachablePeriod(currentFilingPeriod)
        }
      }

      try {
        const keycloak = await initKeycloak()
        setKeycloakConfigured(true)
        setAuthenticationAttempted(true)

        if (keycloak.authenticated) {
          AccessToken.set(keycloak.token)
          refresh()
          if (redirecting) {
            dispatch(isRedirecting(false))
          }
        } else if (!isHome()) {
          login(location.pathname)
        }
      } catch (error) {
        setAuthenticationAttempted(true)
        console.error('Failed to initialize Keycloak:', error)
        history.replace('/filing/' + config.defaultPeriod + '/')
      }
    }

    initializeKeycloak()
  }, [])

  useEffect(() => {
    if (maintenanceMode && !isHome()) {
      return history.push('/filing')
    }

    const currentFilingPeriod = match.params.filingPeriod

    if (!location.pathname.includes('/profile')) {
      if (!isPeriodReachable(currentFilingPeriod)) {
        redirectToReachablePeriod(currentFilingPeriod)
      } else if (currentFilingPeriod !== filingPeriod) {
        dispatch(updateFilingPeriod(currentFilingPeriod))
      }
    }

    const keycloak = getKeycloak()
    if (!keycloak.authenticated && !isHome()) {
      if (keycloakConfigured) {
        login(location.pathname)
      }
    }
  }, [
    location.pathname,
    match.params.filingPeriod,
    maintenanceMode,
    filingPeriod,
  ])

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const renderAppContents = () => {
    if (isOldBrowser()) return <BrowserBlocker />

    // Only show loading during initial authentication attempt
    if (!authenticationAttempted) {
      return <Loading className='floatingIcon' />
    }

    return React.cloneElement(children, {
      match,
      location,
      config,
      selectedPeriod,
    })
  }

  return (
    <div className='AppContainer'>
      <a className='skipnav' href='#main-content'>
        Skip to main content
      </a>
      <ShowUserName isLoggedIn={getKeycloak().authenticated} />

      <ConfirmationModal />
      {config.filingAnnouncement ? (
        <FilingAnnouncement data={config.filingAnnouncement} />
      ) : null}
      {match.params.filingPeriod === '2017' ? (
        <p className='full-width'>
          Files are no longer being accepted for the 2017 filing period. For
          further assistance, please contact{' '}
          <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.
        </p>
      ) : (
        renderAppContents()
      )}
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const { filingPeriod, redirecting, statePathname, filingPeriodOptions } =
    state.app
  const { maintenanceMode, filingAnnouncement } = ownProps.config
  const selectedPeriod = ownProps.config.filingPeriodStatus[filingPeriod] || {}

  return {
    redirecting,
    statePathname,
    maintenanceMode,
    filingAnnouncement,
    filingPeriod,
    filingPeriodOptions,
    selectedPeriod,
  }
}

export default connect(mapStateToProps)(AppContainer)
