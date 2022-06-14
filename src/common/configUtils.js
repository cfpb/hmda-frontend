import prod from './constants/prod-config.json'
import prodBeta from './constants/prod-beta-config.json'
import dev from './constants/dev-config.json'
import devBeta from './constants/dev-beta-config.json'
import { deriveConfig } from '../deriveConfig'

const CONFIG_URL_PREFIX = 'https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/common/constants/'

export function fetchEnvConfig(setFn, host) {
  const url = `${CONFIG_URL_PREFIX}${getDefaultConfig(host).name}-config.json`
  const options = {
    cache: 'reload', // Bypass the cache, always fetching the latest config on app load
  }

  return fetch(url, options)
    .then(data => data.json())
    .then(config => setFn(deriveConfig(config)))
}

export function getDefaultConfig(str) {
  const host = str.replace(/https?:\/\//, "")
  
  const baseConfig = isProd(host)
    ? isBeta(host)
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

export function isProd(host) {
  return !!host.match('^ffiec')
}

export function isBeta(host) {
  return !!host.match('beta')
}