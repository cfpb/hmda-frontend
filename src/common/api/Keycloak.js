import Keycloak from 'keycloak-js'

let keycloak = null
let isInitialized = false
let initPromise = null

let keycloakRedirect = null
let hostname = window.location.hostname

if (hostname == 'ffiec.beta.cfpb.gov') {
  keycloakRedirect = 'ffiec.cfpb.gov'
} else if (hostname.includes('4-beta')) {
  keycloakRedirect = hostname.replace('4-beta.demo', 'dev')
} else if (hostname.includes('-beta')) {
  keycloakRedirect = hostname.replace('-beta', '')
} else {
  keycloakRedirect = hostname
}

const keycloakConfig = {
  "realm": "hmda2",
  "url": `https://${keycloakRedirect}/auth`,
  "clientId": "hmda2-api",
  "public-client": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  "ssl-required": "all"
}

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
      keycloak = new Keycloak(keycloakConfig)
    }
  }

  initPromise = keycloak
    .init({ pkceMethod: 'S256', checkLoginIframe: false })
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
