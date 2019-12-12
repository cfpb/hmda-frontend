import { CONFIG_URL } from './constants/config'
import { isBeta } from './Beta'

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