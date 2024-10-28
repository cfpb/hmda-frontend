/*eslint no-restricted-globals: 0*/
import { error } from './log.js'
import { getStore } from './store.js'
import isRedirecting from '../actions/isRedirecting.js'
import { getKeycloak } from '../../common/api/Keycloak'
import * as AccessToken from '../../common/api/AccessToken.js'

const getLoginGovDomain = () => {
  if (import.meta.env.MODE === 'development') {
    return 'https://idp.int.identitysandbox.gov'
  }
  return 'https://secure.login.gov'
}

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

  const loginGovDomain = getLoginGovDomain()
  const redirectUri = `${location.origin}/filing/${store.getState().app.filingPeriod}/institutions`

  // Construct the state parameter to include necessary information
  const state = encodeURIComponent(
    JSON.stringify({
      keycloakUrl: keycloak.authServerUrl,
      realm: keycloak.realm,
      clientId: keycloak.clientId,
      redirectUri: redirectUri,
    }),
  )

  // Construct the Login.gov registration URL
  const registrationUrl = `${loginGovDomain}/sign_up/enter_email?state=${state}`

  // Redirect to Login.gov registration page
  window.location.href = registrationUrl
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
