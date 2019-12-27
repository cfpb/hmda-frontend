import { isProd, getEnvConfig } from './configUtils'

describe('isProd', () => {
  it('when host starts with ffiec', () => {
    expect(isProd('not.ffiec.prod')).toBe(false)
    expect(isProd('ffiec.prod')).toBe(true)
  })
})

describe('getEnvConfig', () => {
  const testConfig = {
    prod: {
      name: 'prod-default',
      beta: { name: 'prod-beta' }
    },
    dev: {
      name: 'dev-default',
      beta: { name: 'dev-beta' }
    }
  }

  it('finds prod-default', () => {
    const host = 'ffiec.test'
    expect(getEnvConfig(testConfig, host).name).toEqual('prod-default')
  })

  it('find prod-beta', () => {
    const host = 'ffiec.test.beta'
    expect(getEnvConfig(testConfig, host).name).toEqual('prod-beta')
  })

  it('find dev-default', () => {
    const host = 'dev.test'
    expect(getEnvConfig(testConfig, host).name).toEqual('dev-default')
  })

  it('find dev-beta', () => {
    const host = 'dev.test.beta'
    expect(getEnvConfig(testConfig, host).name).toEqual('dev-beta')
  })
})
