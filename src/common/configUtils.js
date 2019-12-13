import { isBeta } from './Beta'

const CONFIG_URL = 'https://raw.githubusercontent.com/cfpb/hmda-frontend/src/common/constants/config.json'

export function fetchEnvConfig(setFn, host) {
  return fetch(CONFIG_URL)
    .then(data => data.json())
    .then(config => setFn(getEnvConfig(config, host)))
}

export function getEnvConfig(config, host) {
  let env = isProd(host) ? { ...config.prod } : { ...config.dev }
  if (isBeta(host)) env = { ...env.beta }
  return env
}

export function isProd(host) {
  return !!host.match('^ffiec')
}
