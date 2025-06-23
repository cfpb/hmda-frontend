import { useState, useEffect } from 'react'
import { fetchEnvConfig, getDefaultConfig } from './configUtils'

export function useEnvironmentConfig(host) {
  const [config, setConfig] = useState(getDefaultConfig(host))

  useEffect(() => {
    if (window.location.hostname !== 'localhost') {
      fetchEnvConfig(setConfig, host).catch(() => null)
    }
  }, [host])

  return config
}
