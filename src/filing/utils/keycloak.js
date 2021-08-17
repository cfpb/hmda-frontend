/*eslint no-restricted-globals: 0*/
import { error } from './log.js'
import { getStore } from './store.js'
import isRedirecting from '../actions/isRedirecting.js'
import { getKeycloak } from '../../common/api/Keycloak'
import * as AccessToken from '../../common/api/AccessToken.js'

let keycloak = getKeycloak()

let loginAttempts = 0
const resetLoginAttempts = () => loginAttempts = 0

const login = (path) => {
  loginAttempts++
  if(loginAttempts > 3) {
    // Require re-authentication after too many calls to login(), 
    //  which is indicative that current user session is invalid.
    resetLoginAttempts()
    return logout()
  }
  const store = getStore()
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  if(!path) path = `/filing/${store.getState().app.filingPeriod}/institutions`
  store.dispatch(isRedirecting(true))
  keycloak.login({ redirectUri: location.origin + path })
}

const refresh = () => {
  resetLoginAttempts()
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak
        .updateToken(20)
        .then(refreshed => {
          if (refreshed) {
            AccessToken.set(keycloak.token)
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
  resetLoginAttempts()
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  keycloak.logout({ redirectUri: location.origin + `/filing/${getStore().getState().app.filingPeriod}/` })
}


export {
  register,
  login,
  logout,
  refresh,
}
