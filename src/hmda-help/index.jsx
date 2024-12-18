import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable' // For fancy JS

import React, { useState, useEffect } from 'react'
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom'
import NotAuthorized from './NotAuthorized'
import Header from './Header'
import Search from './search'
import Institution from './institution'
import { initKeycloak, getKeycloak } from '../common/api/Keycloak'
import { withAppContext } from '../common/appContextHOC'
import * as AccessToken from '../common/api/AccessToken'

import './index.css'

let refreshTimeout = null

const App = ({ config }) => {
  const [authState, setAuthState] = useState({
    tokenParsed: null,
    authenticated: false,
    authorized: false,
  })

  const refreshToken = (keycloak) => {
    const updateKeycloak = () => {
      if (refreshTimeout) clearTimeout(refreshTimeout)

      refreshTimeout = setTimeout(
        () => {
          keycloak
            .updateToken(20)
            .then((refreshed) => {
              if (refreshed) {
                AccessToken.set(keycloak.token)
              }
              updateKeycloak()
            })
            .catch(() => {
              return keycloak.login()
            })
        },
        +(keycloak.tokenParsed.exp + '000') - Date.now() - 10000,
      )
    }
    updateKeycloak()
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const keycloak = await initKeycloak()

        if (keycloak.authenticated) {
          AccessToken.set(keycloak.token)
          refreshToken(keycloak)
          setAuthState({
            tokenParsed: keycloak.tokenParsed,
            authenticated: true,
            authorized: keycloak.hasResourceRole('hmda-admin', 'hmda2-api'),
          })
        } else {
          keycloak.login({ redirectUri: location.href })
        }
      } catch (error) {
        console.error('Failed to initialize Keycloak:', error)
      }
    }

    initialize()

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout)
    }
  }, [])

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => <Component {...props} config={rest.config} />}
      />
    )
  }

  if (authState.authenticated) {
    if (authState.authorized) {
      const keycloak = getKeycloak()

      return (
        <Switch basename='/hmda-help'>
          <React.Fragment>
            <Header logout={keycloak.logout} />
            <ProtectedRoute exact path='/' component={Search} config={config} />
            <ProtectedRoute
              exact
              path='/search/institution'
              component={Search}
              config={config}
            />
            <ProtectedRoute
              exact
              path='/search/institution/:id'
              component={Search}
              config={config}
            />
            <ProtectedRoute
              exact
              path='/search/publications/:id'
              component={Search}
              config={config}
            />
            <ProtectedRoute
              exact
              path='/search/submissions/:id'
              component={Search}
              config={config}
            />
            <ProtectedRoute
              exact
              path='/add'
              component={Institution}
              config={config}
            />
            <ProtectedRoute
              exact
              path='/update'
              component={Institution}
              config={config}
            />
            <ProtectedRoute
              exact
              path='/update/institution/:id/:year'
              component={Institution}
              config={config}
            />
            <Route exact path='/update/institution'>
              <Redirect to={'/search/institution'} />
            </Route>
          </React.Fragment>
        </Switch>
      )
    }
    return <NotAuthorized />
  }

  return <span />
}

export default withAppContext(App)
