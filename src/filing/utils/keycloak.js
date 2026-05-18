/* eslint no-restricted-globals: 0 */
import * as AccessToken from '../../common/api/AccessToken.js'
import { getKeycloak } from '../../common/api/Keycloak'
import isRedirecting from '../actions/isRedirecting.js'
import { USER_FOUND } from '../constants'
import { error } from './log.js'
import { getStore } from './store.js'

const login = (path) => {
  const keycloak = getKeycloak()
  if (!keycloak) {
    console.error('Keycloak is not initialized')
    return
  }
  const store = getStore()

  if (!path) path = `/filing/${store.getState().app.filingPeriod}/institutions`

  store.dispatch(isRedirecting(true))
  keycloak.login({ redirectUri: location.origin + path })
}

const refresh = () => {
  const keycloak = getKeycloak()
  if (!keycloak) {
    console.error('Keycloak is not initialized')
    return
  }
const store = getStore()

  const updateKeycloak = () => {
    setTimeout(
      () => {
        keycloak
          .updateToken(20)
          .then((refreshed) => {
            if (refreshed) {
              AccessToken.set(keycloak.token)
              store.dispatch({ type: USER_FOUND, payload: keycloak })
            }
            updateKeycloak()
          })
          .catch(() => {
            return login()
          })
      },
      Number(`${keycloak.tokenParsed.exp}000`) - Date.now() - 10000,
    )
  }
  updateKeycloak()
}

// Method used to forced a token refresh such that profile page has the most up to date associated LEIs
const forceRefreshToken = async () => {
  const keycloak = getKeycloak()
  if (!keycloak) {
    console.error('Keycloak is not initialized')
    return
  }

  try {
    const refreshed = await keycloak.updateToken(55000)
    if (refreshed) {
      AccessToken.set(keycloak.token)
      store.dispatch({ type: USER_FOUND, payload: keycloak })
    }
    refresh()
  } catch (error) {
    console.error('Failed to refresh token:', error)
    login()
  }
}

const register = () => {
  const keycloak = getKeycloak()
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
  const keycloak = getKeycloak()
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  const store = getStore()
  const postLogoutRedirectUri = encodeURIComponent(
    `${location.origin}/filing/${store.getState().app.filingPeriod}/${
      queryString
    }`,
  )

  const logoutUrl =
    `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/logout` +
    `?id_token_hint=${encodeURIComponent(keycloak.idToken)}` +
    `&post_logout_redirect_uri=${postLogoutRedirectUri}`

  // Perform logout and redirect
  keycloak.clearToken()
  window.location.href = logoutUrl
}

export { forceRefreshToken, login, logout, refresh, register }

