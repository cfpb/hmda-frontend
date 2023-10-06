
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
  if (import.meta.env.VITE_ENVIRONMENT === 'CI')
    return setKeycloak(mockKeycloak(overrides))
  if (import.meta.env.MODE === 'development')
    return setKeycloak(
      Keycloak(import.meta.env.PUBLIC_URL + "/local_keycloak.json")
    )
  return setKeycloak(Keycloak(import.meta.env.PUBLIC_URL + '/keycloak.json'))
}

export const mockKeycloak = (overrides = {}) => ({
  authenticated: true,
  tokenParsed: {
    name: 'Test User',
    lei: import.meta.env.VITE_LEIS || 'FRONTENDTESTBANK9999',
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