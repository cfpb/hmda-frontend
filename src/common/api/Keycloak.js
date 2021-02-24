
import Keycloak from 'keycloak-js'

let keycloak = null

export const setKeycloak = (cloak) => {
  keycloak = cloak
  return keycloak
}

export const getKeycloak = () => {
  if(!keycloak) return initKeycloak()
  return keycloak
}

export const initKeycloak = (overrides) => {
  if(keycloak) return keycloak
  if (process.env.REACT_APP_ENVIRONMENT === 'CI')
    return setKeycloak(mockKeycloak(overrides))
  if (process.env.NODE_ENV === 'development')
    return setKeycloak(
      Keycloak(process.env.PUBLIC_URL + '/local_keycloak.json')
    )
  return setKeycloak(Keycloak(process.env.PUBLIC_URL + '/keycloak.json'))
}

export const mockKeycloak = (overrides = {}) => ({
  authenticated: true,
  tokenParsed: {
    name: 'Test User',
    lei: process.env.REACT_APP_LEIS || 'FRONTENDTESTBANK9999',
    exp: Date.now() + 18000000,
  },
  init: () => new Promise((res) => res(true)),
  updateToken: () =>
    new Promise((resolve) =>
      resolve({
        success: () => {},
        error: () => false
      })
    ),
  logout: () => (window.location.href = '/filing'),
  login: () => (window.location.href += 'institutions'),
  hasResourceRole: () => true,
  ...overrides
})