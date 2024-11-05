/*eslint no-restricted-globals: 0*/
import { error } from './log.js'
import { getStore } from './store.js'
import isRedirecting from '../actions/isRedirecting.js'
import { getKeycloak } from '../../common/api/Keycloak'
import * as AccessToken from '../../common/api/AccessToken.js'

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
            return login()
          })
      },
      +(keycloak.tokenParsed.exp + '000') - Date.now() - 10000,
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
    location.origin +
      `/filing/${store.getState().app.filingPeriod}/` +
      queryString,
  )

  const logoutUrl =
    `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/logout` +
    `?client_id=${keycloak.clientId}` + // Use client_id instead of id_token_hint
    `&post_logout_redirect_uri=${postLogoutRedirectUri}`

  // Perform logout and redirect
  keycloak.clearToken()
  window.location.href = logoutUrl
}

export { register, login, logout, refresh, forceRefreshToken }
