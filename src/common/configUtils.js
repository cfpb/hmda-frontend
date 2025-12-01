import prod from './constants/prod-config.json'
import prodBeta from './constants/prod-beta-config.json'
import prodTest from './constants/prod-test-config.json'
import dev from './constants/dev-config.json'
import devBeta from './constants/dev-beta-config.json'
import { deriveConfig } from '../deriveConfig'

const CONFIG_URL_PREFIX =
  'https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/common/constants/'

export function fetchEnvConfig(setFn, host) {
  return fetch(`${CONFIG_URL_PREFIX}${getDefaultConfig(host).name}-config.json?nocache=${Date.now()}`)
    .then((data) => data.json())
    .then((config) => setFn(deriveConfig(config)))
}

export function getDefaultConfig(str) {
  const host = str.replace(/https?:\/\//, '')

  // TODO: temp use prod-test.json for '-test' domains until cutover complete
  // see: GHE issue #5296
  const baseConfig = isProd(host)
    ? isTest(host)
      ? prodTest
      : isBeta(host)
        ? prodBeta
        : prod
    : isBeta(host)
      ? devBeta
      : dev

  const derivedConfig = deriveConfig(baseConfig)

  if (isBeta(host)) {
    const prodConfig = getDefaultConfig('ffiec')
    derivedConfig.defaultPeriod = prodConfig?.defaultPeriod
  }

  return derivedConfig
}

export function isProd(host = window.location.hostname) {
  return !!host.match('^ffiec')
}

export function isBeta(host = window.location.hostname) {
  return !!host.match('beta')
}

export function isTest(host = window.location.hostname) {
  return !!host.match('-test')
}
