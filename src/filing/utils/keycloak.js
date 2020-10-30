/*eslint no-restricted-globals: 0*/
import { error } from './log.js'
import { getStore } from './store.js'
import isRedirecting from '../actions/isRedirecting.js'
import * as AccessToken from '../api/AccessToken.js'
let keycloak = null

const setKeycloak = cloak => {
  keycloak = cloak
  return keycloak
}

const getKeycloak = () => {
  return keycloak
}

const login = (path) => {
  const store = getStore()
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  if(!path) path = `/filing/${store.getState().app.filingPeriod}/institutions`
  store.dispatch(isRedirecting(true))
  keycloak.login({ redirectUri: location.origin + path })
}

const refresh = () => {
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak
        .updateToken(20)
        .success(refreshed => {
          if (refreshed) {
            AccessToken.set(keycloak.token)
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

const register = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  const store = getStore()
  store.dispatch(isRedirecting(true))
  keycloak.login({
    redirectUri: `${location.origin}/filing/${store.getState().app.filingPeriod}/institutions`,
    action: 'register'
  })
}

const logout = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  keycloak.logout({ redirectUri: location.origin + `/filing/${getStore().getState().app.filingPeriod}/` })
}

const mockKeycloak = {
  authenticated: true,
  tokenParsed: { name: 'Test User', lei: process.env.REACT_APP_LEIS || 'FRONTENDTESTBANK9999' },
  init: () => new Promise((res) => res(true)),
  updateToken: () => ({ success: () => ({ error: () => false }) }),
  logout: () => window.location.href = '/filing',
  login: () => window.location.href += 'institutions',
  hasResourceRole: () => true
}

export {
  getKeycloak,
  setKeycloak,
  register,
  login,
  logout,
  refresh,
  mockKeycloak
}
