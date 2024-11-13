import Keycloak from 'keycloak-js'

let keycloak = null
let isInitialized = false
let initPromise = null

export const setKeycloak = (cloak) => {
  keycloak = cloak
  return keycloak
}

export const getKeycloak = () => {
  return keycloak
}

export const initKeycloak = (overrides) => {
  if (isInitialized) {
    return Promise.resolve(keycloak)
  }

  if (initPromise) {
    return initPromise
  }

  if (!keycloak) {
    if (import.meta.env.VITE_ENVIRONMENT === 'CI') {
      keycloak = mockKeycloak(overrides)
    } else if (import.meta.env.MODE === 'development') {
      keycloak = new Keycloak('/local_keycloak.json')
    } else {
      keycloak = new Keycloak('/keycloak.json')
    }
  }

  initPromise = keycloak
    .init({ pkceMethod: 'S256' })
    .then((authenticated) => {
      console.log('Keycloak initialized, authenticated:', authenticated)
      isInitialized = true
      initPromise = null
      return keycloak
    })
    .catch((error) => {
      console.error('Failed to initialize Keycloak:', error)
      initPromise = null
      throw error
    })

  return initPromise
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
        error: () => false,
      }),
    ),
  logout: () => (window.location.href = '/filing'),
  login: () => (window.location.href += 'institutions'),
  hasResourceRole: () => true,
  ...overrides,
})
