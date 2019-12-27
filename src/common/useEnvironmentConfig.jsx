import { useState, useEffect } from 'react'
import defaultConfig from './constants/config.json'
import { fetchEnvConfig, getEnvConfig } from './configUtils'

export function useEnvironmentConfig(host) {
  const [config, setConfig] = useState(getEnvConfig(defaultConfig, host))
  useEffect(() => {
    if(window.location.hostname !== 'localhost'){
      fetchEnvConfig(setConfig, host).catch(() => null)
    }
  }, [host])

  return config
}
