import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from './modals/confirmationModal/container.jsx'
import BrowserBlocker from './common/BrowserBlocker.jsx'
import Loading from '../common/Loading.jsx'
import * as AccessToken from './api/AccessToken.js'
import { getKeycloak, refresh } from './utils/keycloak.js'
import isRedirecting from './actions/isRedirecting.js'
import updateFilingPeriod from './actions/updateFilingPeriod.js'
import { FILING_PERIODS } from './constants/dates.js'
import { detect } from 'detect-browser'

import 'normalize.css'
import './app.css'

const browser = detect()

export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(updateFilingPeriod(this.props.params.filingPeriod))
    const keycloak = getKeycloak()
    keycloak.init().then(authenticated => {
      if (authenticated) {
        AccessToken.set(keycloak.token)
        refresh()
        if (this.props.redirecting) this.props.dispatch(isRedirecting(false))
        else this.forceUpdate()
      } else {
        if (!this._isHome(this.props))
          keycloak.login(this.props.location.pathname)
      }
    })
  }

  componentDidUpdate(props) {
    const keycloak = getKeycloak()
    if (!keycloak.authenticated && !this._isHome(this.props)) keycloak.login()
  }

  _renderAppContents(props) {
    if (this._isOldBrowser()) return <BrowserBlocker />
    if (
      props.redirecting ||
      (!getKeycloak().authenticated && !this._isHome(props))
    )
      return <Loading className="floatingIcon" />
    return props.children
  }

  _isOldBrowser() {
    return browser.name === 'ie' && +browser.version.split('.')[0] < 11
  }

  _isHome(props) {
    return !!props.location.pathname.match(/^\/filing\/\d{4}\/$/)
  }

  render() {
    const { params, location } = this.props
    return (
      <div className="AppContainer">
        <a className="skipnav" href="#main-content">
          Skip to main content
        </a>
        <Header filingPeriod={params.filingPeriod} pathname={location.pathname} />
        <ConfirmationModal />
        {FILING_PERIODS.indexOf(params.filingPeriod) !== -1
          ? this._renderAppContents(this.props)
          : params.filingPeriod === '2017'
            ? <p className="usa-grid-full">Files are no longer being accepted for the 2017 filing period. For further assistance, please contact <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.</p>
            : <p className="usa-grid-full">The {params.filingPeriod} filing period does not exist. If this seems wrong please contact <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.</p>
        }
        <Footer filingPeriod={this.props.params.filingPeriod}/>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const { redirecting } = state.app

  return {
    redirecting
  }
}

export default connect(mapStateToProps)(AppContainer)
