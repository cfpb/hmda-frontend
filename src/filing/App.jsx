import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from './modals/confirmationModal/container.jsx'
import Beta, { isBeta } from '../common/Beta'
import Header from './common/Header.jsx'
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

export class AppContainer extends Component {
  componentDidMount() {
    if(this.props.maintenanceMode && !this._isHome(this.props))
      return this.props.history.push('/filing')

    const filingPeriod = this.props.match.params.filingPeriod
    
    if(this.isPeriodReachable(filingPeriod))
      this.props.dispatch(updateFilingPeriod(filingPeriod))
    else 
      this.redirectToReachablePeriod(filingPeriod)
    
    const keycloak = initKeycloak()
    keycloak.init({ pkceMethod: 'S256' }).then(authenticated => {
      this.keycloakConfigured = true
      if (authenticated) {
        AccessToken.set(keycloak.token)
        refresh()
        if (this.props.redirecting) this.props.dispatch(isRedirecting(false))
        else this.forceUpdate()
      } else {
        if (!this._isHome(this.props))
          login(this.props.location.pathname)
      }
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.maintenanceMode && !this._isHome(this.props))
      return this.props.history.push('/filing')

    const filingPeriod = this.props.match.params.filingPeriod
    if (!this.isPeriodReachable(filingPeriod))
      this.redirectToReachablePeriod(filingPeriod)
    else if (filingPeriod !== this.props.filingPeriod)
      this.props.dispatch(updateFilingPeriod(filingPeriod))

    const keycloak = getKeycloak()
    if (!keycloak.authenticated && !this._isHome(this.props)){
      if(this.keycloakConfigured) login(this.props.location.pathname)
    }

    if (this.props.location.pathname !== prevProps.location.pathname){
      window.scrollTo(0,0)
    }
  }

  _renderAppContents(props) {
    if (this._isOldBrowser()) return <BrowserBlocker />
    if (
      props.redirecting ||
      (!getKeycloak().authenticated && !this._isHome(props))
    )
      return <Loading className="floatingIcon" />
    return React.cloneElement(props.children, {
      match: this.props.match,
      location: this.props.location,
      config: this.props.config,
      selectedPeriod: this.props.selectedPeriod
    })
  }

  _isOldBrowser() {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  _isHome(props) {
    return !!props.location.pathname.match(/^\/filing\/\d{4}(-Q\d)?\/$/)
  }

  redirectToDefaultPeriod(previous) {
    const defaultPeriod = this.props.config.defaultPeriod

    this.props.dispatch(updateFilingPeriod(defaultPeriod))
    this.props.history.replace(
      this.props.location.pathname.replace(previous, defaultPeriod)
    )
  }

  redirectToReachablePeriod(period){
    const quarters = PERIODS
      .filter(p => p.includes('Q'))
      .map(period => '-' + period)
    
    const [year, _quarter] = splitYearQuarter(period)

    // Try to redirect to the latest Quarterly period
    for (let i = 0; i < quarters.length; i++) {
      const fp = year + quarters[i]
      if (this.isPeriodReachable(fp)) {
        this.props.dispatch(updateFilingPeriod(fp))
        this.props.history.replace(
          this.props.location.pathname.replace(period, fp)
        )
        return
      }
    }

    // If we can't find a reachable Quarter, fall back to the default filing period
    this.redirectToDefaultPeriod(period)
  }

  isPeriodReachable(period) {
    if (period === '2017') return true // We display a special message for 2017

    const guards = this.props.config.filingPeriodStatus
    const current = guards[period]

    return current && current.isVisible
  }

  render() {
    const { match: { params }, location, config: { filingAnnouncement } } = this.props

    return (
      <div className="AppContainer">
        <a className="skipnav" href="#main-content">
          Skip to main content
        </a>
        <ShowUserName isLoggedIn = {getKeycloak().authenticated} />
       
        <ConfirmationModal />
        {isBeta() ? <Beta/> : null}
        {filingAnnouncement ? <FilingAnnouncement data={filingAnnouncement} /> : null}
        {params.filingPeriod === '2017' ? (
          <p className='full-width'>
            Files are no longer being accepted for the 2017 filing period. For
            further assistance, please contact{' '}
            <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.
          </p>
        ) : (
          this._renderAppContents(this.props)
        )}
      </div>
    )
  }
}

export function mapStateToProps(state, ownProps) {
  const { filingPeriod, redirecting, statePathname, filingPeriodOptions } = state.app
  const { maintenanceMode, filingAnnouncement } = ownProps.config
  const selectedPeriod = ownProps.config.filingPeriodStatus[filingPeriod] || {}

  return {
    redirecting,
    statePathname,
    maintenanceMode,
    filingAnnouncement,
    filingPeriod,
    filingPeriodOptions,
    selectedPeriod // FilingPeriodStatus
  }
}

export default connect(mapStateToProps)(AppContainer)
