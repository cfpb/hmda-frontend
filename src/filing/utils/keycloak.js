/*eslint no-restricted-globals: 0*/
import { error } from './log.js'
import { getStore } from './store.js'
import isRedirecting from '../actions/isRedirecting.js'
import { getKeycloak } from '../../common/api/Keycloak'
import * as AccessToken from '../../common/api/AccessToken.js'

let keycloak = getKeycloak()

let loginAttempts = 0
const resetLoginAttempts = () => (loginAttempts = 0)

const login = (path) => {
  loginAttempts++
  if (loginAttempts > 2) {
    // Require re-authentication after too many calls to login(),
    //  which is indicative that current user session is invalid.
    resetLoginAttempts()
    return logout('?session=expired')
  }
  const store = getStore()
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  if (!path) path = `/filing/${store.getState().app.filingPeriod}/institutions`
  store.dispatch(isRedirecting(true))
  // Delay keycloak.login attempts for a progressively longer period in order
  // to allow time to recognize invalid session.
  setTimeout(
    () => keycloak.login({ redirectUri: location.origin + path }),
    loginAttempts * 750,
  )
}

const refresh = () => {
  resetLoginAttempts()
  const updateKeycloak = () => {
    setTimeout(
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

// Method used to forced a token refresh such that profile page has the most up to date associated LEIs
const forceRefreshToken = async () => {
  resetLoginAttempts()
  const updateKeycloak = () => {
    return keycloak
      .updateToken(55000)
      .then((refreshed) => {
        if (refreshed) {
          AccessToken.set(keycloak.token)
        }
        refresh()
      })
      .catch(() => {
        return keycloak.login()
      })
  }
  await updateKeycloak()
}

const register = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  const store = getStore()
  store.dispatch(isRedirecting(true))
  keycloak.login({
    redirectUri: `${location.origin}/filing/${
      store.getState().app.filingPeriod
    }/institutions`,
    action: 'register',
  })
}

const logout = (queryString = '') => {
  resetLoginAttempts()
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  const store = getStore()
  const postLogoutRedirectUri = encodeURIComponent(
    location.origin +
      `/filing/${store.getState().app.filingPeriod}/` +
      queryString,
  )

  // Construct the logout URL manually
  const logoutUrl =
    `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/logout` +
    `?id_token_hint=${keycloak.idToken}` +
    `&post_logout_redirect_uri=${postLogoutRedirectUri}`

  // Perform logout and redirect
  keycloak.clearToken()
  window.location.href = logoutUrl
}

export { register, login, logout, refresh, forceRefreshToken }
