import { useState, useEffect } from 'react'
import defaultConfig from './constants/config.json'
import { fetchEnvConfig } from './configUtils'

export function useEnvironmentConfig(host) {
  const [config, setConfig] = useState(defaultConfig)

  useEffect(() => {
    fetchEnvConfig(setConfig, host).catch(() => null)
  }, [host])

  return config
}
