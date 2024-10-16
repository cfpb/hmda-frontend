import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
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
import 'normalize.css'
import './app.css'

import { ShowUserName } from '../common/ShowUserName'

const browser = detect()

export const AppContainer = ({ config, children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { filingPeriod } = useParams()

  const [keycloakInitialized, setKeycloakInitialized] = useState(false)

  const { redirecting, statePathname, filingPeriodOptions } = useSelector(
    (state) => state.app,
  )
  const { maintenanceMode, filingAnnouncement } = config
  const selectedPeriod = config.filingPeriodStatus[filingPeriod] || {}

    useEffect(() => {
      if (maintenanceMode && !isHome()) {
        history.push('/filing')
        return
      }

      if (!location.pathname.includes('/profile')) {
        if (isPeriodReachable(filingPeriod))
          dispatch(updateFilingPeriod(filingPeriod))
        else redirectToReachablePeriod(filingPeriod)
      }

      const initKeycloakInstance = async () => {
        try {
          const keycloak = await initKeycloak()
          setKeycloakInitialized(true)

          if (keycloak.authenticated) {
            handleAuthenticated(keycloak)
          } else if (!isHome()) {
            login(location.pathname)
          }
        } catch (error) {
          console.error('Failed to initialize Keycloak:', error)
        }
      }

      initKeycloakInstance()
    }, [])

  useEffect(() => {
    if (location.pathname !== statePathname) {
      window.scrollTo(0, 0)
    }

    const keycloak = getKeycloak()
    if (
      keycloakInitialized &&
      keycloak &&
      !keycloak.authenticated &&
      !isHome()
    ) {
      login(location.pathname)
    }
  }, [location.pathname, keycloakInitialized])

  const handleAuthenticated = (keycloak) => {
    AccessToken.set(keycloak.token)
    refresh()
    if (redirecting) dispatch(isRedirecting(false))
  }

  const handleAuthError = (error) => {
    console.error('Keycloak authentication error:', error)
    if (!isHome()) login(location.pathname)
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

  const isOldBrowser = () => {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  const renderAppContents = () => {
    if (isOldBrowser()) return <BrowserBlocker />
    const keycloak = getKeycloak()
    if (redirecting || (!keycloak?.authenticated && !isHome()))
      return <Loading className='floatingIcon' />
    return React.Children.map(children, (child) =>
      React.cloneElement(child, {
        match: { params: { filingPeriod } },
        location,
        config,
        selectedPeriod,
      }),
    )
  }

  console.log(getKeycloak());

  return (
    <div className='AppContainer'>
      <a className='skipnav' href='#main-content'>
        Skip to main content
      </a>
      <ShowUserName isLoggedIn={getKeycloak()?.authenticated} />

      <ConfirmationModal />
      {filingAnnouncement ? (
        <FilingAnnouncement data={filingAnnouncement} />
      ) : null}
      {filingPeriod === '2017' ? (
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

export default AppContainer
