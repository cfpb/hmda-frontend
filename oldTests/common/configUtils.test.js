import { isProd, getDefaultConfig } from '../../src/common/configUtils'

describe('isProd', () => {
  it('when host starts with ffiec', () => {
    expect(isProd('not.ffiec.prod')).toBe(false)
    expect(isProd('ffiec.prod')).toBe(true)
  })
})

describe('getDefaultConfig', () => {
  it('finds prod', () => {
    const host = 'ffiec.test'
    expect(getDefaultConfig(host).name).toEqual('prod')
  })

  it('finds prod-beta', () => {
    const host = 'ffiec.test.beta'
    expect(getDefaultConfig(host).name).toEqual('prod-beta')
  })

  it('finds dev', () => {
    const host = 'dev.test'
    expect(getDefaultConfig(host).name).toEqual('dev')
  })

  it('finds dev-beta', () => {
    const host = 'dev.test.beta'
    expect(getDefaultConfig(host).name).toEqual('dev-beta')
  })
})
