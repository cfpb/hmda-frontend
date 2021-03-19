import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable' // For fancy JS

import React, { Component } from 'react'
import { BrowserRouter as Switch, Route } from 'react-router-dom'
import NotAuthorized from './NotAuthorized'
import Header from './Header'
import Search from './search'
import Institution from './institution'
import { initKeycloak } from '../common/api/Keycloak'
import { withAppContext } from '../common/appContextHOC'
import * as AccessToken from '../common/api/AccessToken'

import './index.css'

let keycloak = initKeycloak()

const refreshToken = self => {
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak
        .updateToken(20)
        .then(refreshed => {
          if (refreshed) {
            AccessToken.set(keycloak.token)
            self.setState({
              token: keycloak.token,
              tokenParsed: keycloak.tokenParsed
            })
          }
          updateKeycloak()
        })
        .catch(() => {
          return keycloak.login()
        })
    }, +(keycloak.tokenParsed.exp + '000') - Date.now() - 10000)
  }
  updateKeycloak()
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenParsed: null,
      authenticated: false,
      authorized: false
    }
  }

  componentDidMount() {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      if (authenticated) {
        AccessToken.set(keycloak.token)
        refreshToken(this)
        this.setState({
          tokenParsed: keycloak.tokenParsed,
          authenticated: authenticated,
          authorized: keycloak.hasResourceRole('hmda-admin', 'hmda2-api'),
        })
      } else keycloak.login({ redirectUri: location.href })
    })
  }

  render() {
    const ProtectedRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={(props) => (
            <Component {...props} config={rest.config} />
          )}
        />
      )
    }

    if (this.state.authenticated) {
      if (this.state.authorized) {
        const config = this.props.config

        return (
          <Switch basename="/hmda-help">
            <React.Fragment>
              <Header logout={keycloak.logout} />
              <ProtectedRoute
                exact
                path="/"
                component={Search}
                config={config}
              />
              <ProtectedRoute
                exact
                path="/add"
                component={Institution}
                config={config}
              />
              <ProtectedRoute
                exact
                path="/update"
                component={Institution}
                config={config}
              />
            </React.Fragment>
          </Switch>
        )
      } else {
        return <NotAuthorized />
      }
    }
    // not logged in
    return <span />
  }
}

export default withAppContext(App)
