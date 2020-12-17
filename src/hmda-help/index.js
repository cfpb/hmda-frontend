import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable' // For fancy JS

import React, { Component } from 'react'
import { BrowserRouter as Switch, Route } from 'react-router-dom'
import Keycloak from 'keycloak-js'

import NotAuthorized from './NotAuthorized'
import Header from './Header'
import Search from './search'
import Institution from './institution'
import { mockKeycloak, setKeycloak } from '../filing/utils/keycloak'
import { withAppContext } from '../common/appContextHOC'

import './index.css'

let keycloak

if(process.env.REACT_APP_ENVIRONMENT === 'CI') 
  keycloak = setKeycloak(mockKeycloak)
else if(process.env.NODE_ENV === 'development') {
  keycloak = setKeycloak(Keycloak(process.env.PUBLIC_URL + '/local_keycloak.json'))
} else {
  keycloak = setKeycloak(Keycloak(process.env.PUBLIC_URL + '/keycloak.json'))
}


const refreshToken = self => {
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak
        .updateToken(20)
        .success(refreshed => {
          if (refreshed) {
            self.setState({
              token: keycloak.token,
              tokenParsed: keycloak.tokenParsed
            })
          }
          updateKeycloak()
        })
        .error(() => {
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
      token: null,
      tokenParsed: null,
      authenticated: false,
      authorized: false
    }
  }

  componentDidMount() {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      refreshToken(this)
      this.setState({
        token: keycloak.token,
        tokenParsed: keycloak.tokenParsed,
        authenticated: authenticated,
        authorized: keycloak.hasResourceRole('hmda-admin', 'hmda2-api')
      })
    })
  }

  render() {
    const ProtectedRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={(props) => (
            <Component {...props} config={rest.config} token={rest.token} />
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
              <Header token={this.state.token} logout={keycloak.logout} />
              <ProtectedRoute
                exact
                path="/"
                component={Search}
                token={this.state.token}
                config={config}
              />
              <ProtectedRoute
                exact
                path="/add"
                component={Institution}
                token={this.state.token}
                config={config}
              />
              <ProtectedRoute
                exact
                path="/update"
                component={Institution}
                token={this.state.token}
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
