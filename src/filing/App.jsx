import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from './modals/confirmationModal/container.jsx'
import Beta, { isBeta } from '../common/Beta'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import BrowserBlocker from './common/BrowserBlocker.jsx'
import Loading from '../common/LoadingIcon.jsx'
import * as AccessToken from './api/AccessToken.js'
import { getKeycloak, refresh, login } from './utils/keycloak.js'
import isRedirecting from './actions/isRedirecting.js'
import updateFilingPeriod from './actions/updateFilingPeriod.js'
import { detect } from 'detect-browser'
import { FilingAnnouncement } from './common/FilingAnnouncement'

import 'normalize.css'
import './app.css'

const browser = detect()

export class AppContainer extends Component {
  componentDidMount() {
    if(this.props.maintenanceMode && !this._isHome(this.props)) 
      return this.props.history.push('/filing')

    const filingPeriod = this.props.match.params.filingPeriod
    if(this.isValidPeriod(filingPeriod)){
      this.props.dispatch(updateFilingPeriod(filingPeriod))
    }else{
      this.checkForValidQuarters(filingPeriod)
    }

    const keycloak = getKeycloak()
    keycloak.init().then(authenticated => {
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
    if(!this.isValidPeriod(filingPeriod)) this.checkForValidQuarters(filingPeriod)

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
    return React.cloneElement(props.children, {match: this.props.match, location: this.props.location, config: this.props.config})
  }

  _isOldBrowser() {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  _isHome(props) {
    return !!props.location.pathname.match(/^\/filing\/\d{4}\/$/)
  }

  checkForValidQuarters(period){
    const quarters = ['-Q3', '-Q2', '-Q1']
    for(let i=0; i< quarters.length; i++){
      const fp = period + quarters[i]
      if(this.isValidPeriod(fp)){
        this.props.dispatch(updateFilingPeriod(fp))
        this.props.history.replace(
          this.props.location.pathname.replace(period, fp)
        )
        return
      }
    }
  }

  isValidPeriod(period) {
    return this.props.config.filingPeriods.indexOf(period) > -1
  }

  render() {
    const { match: { params }, location, config: { filingAnnouncement } } = this.props
    const validFilingPeriod = this.isValidPeriod(params.filingPeriod)

    return (
      <div className="AppContainer">
        <a className="skipnav" href="#main-content">
          Skip to main content
        </a>
        <Header filingPeriod={params.filingPeriod} pathname={location.pathname} />
        <ConfirmationModal />
        {isBeta() ? <Beta/> : null}
        {filingAnnouncement ? <FilingAnnouncement data={filingAnnouncement} /> : null}
        {validFilingPeriod
          ? this._renderAppContents(this.props)
          : params.filingPeriod === '2017'
            ? <p className="full-width">Files are no longer being accepted for the 2017 filing period. For further assistance, please contact <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.</p>
            : <p className="full-width">The {params.filingPeriod} filing period does not exist. If this seems wrong please contact <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.</p>
        }
        <Footer filingPeriod={params.filingPeriod}/>
      </div>
    )
  }
}

export function mapStateToProps(state, ownProps) {
  const { redirecting } = state.app
  const { statePathname } = state.app
  const { maintenanceMode, filingAnnouncement } = ownProps.config

  return {
    redirecting,
    statePathname,
    maintenanceMode, 
    filingAnnouncement
  }
}

export default connect(mapStateToProps)(AppContainer)
