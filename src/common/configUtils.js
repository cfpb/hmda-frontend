import { isBeta } from './Beta'

import prod from './constants/prod-config.json'
import prodBeta from './constants/prod-beta-config.json'
import dev from './constants/dev-config.json'
import devBeta from './constants/dev-beta-config.json'

const CONFIG_URL_PREFIX = 'https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/common/constants/'

export function fetchEnvConfig(setFn, host) {
  return fetch(`${CONFIG_URL_PREFIX}${getDefaultConfig(host).name}-config.json`)
    .then(data => data.json())
    .then(config => setFn(config))
}

export function getDefaultConfig(host) {
  return isProd(host)
    ? isBeta(host)
      ? prodBeta
      : prod
    : isBeta(host)
      ? devBeta
      : dev
}

export function isProd(host) {
  return !!host.match('^ffiec')
}
