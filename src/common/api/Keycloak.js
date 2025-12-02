import Keycloak from 'keycloak-js'

let keycloak = null
let isInitialized = false
let initPromise = null

// check out [ENT]/HMDA-Operations/hmda-devops/blob/master/eks/hmda_urls.md for more details
// about the different HMDA environments

const prodKeycloakDomain = 'ffiec-test.cfpb.gov'
const domainsToBeRedirectedToProdKeycloak = [
  'prod-regtech',
  'ffiec-beta-test',
  'ffiec.beta.cfpb.gov',
]

const devKeycloakDomain = 'hmdadev.cfpb.gov'
const domainsToBeRedirectedToDevKeycloak = ['hmda4-beta.demo']

const getKeycloakInstance = (hostname) => {
  const isRedirectedToProd = domainsToBeRedirectedToProdKeycloak.some(
    (domain) => hostname.includes(domain),
  )
  const isRedirectedToDev = domainsToBeRedirectedToDevKeycloak.some((domain) =>
    hostname.includes(domain),
  )

  if (isRedirectedToProd) return prodKeycloakDomain
  if (isRedirectedToDev) return devKeycloakDomain

  // if hostname doesn't match any known redirect patterns, assume keycloak is hosted on the same domain
  return hostname
}

const hostname = window.location.hostname
const keycloakInstance = getKeycloakInstance(hostname)

const keycloakConfig = {
  realm: 'hmda2',
  url: `https://${keycloakInstance}/auth`,
  clientId: 'hmda2-api',
  'public-client': true,
  'use-resource-role-mappings': true,
  'confidential-port': 0,
  'ssl-required': 'all',
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
