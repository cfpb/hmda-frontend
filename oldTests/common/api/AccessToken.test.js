import * as AccessToken from '../../../src/common/api/AccessToken'

describe('access token getter/setter', () => {
  it('should return an empty string when access token is not set', () => {
    expect(AccessToken.get()).toEqual('')
  })

  it('should set the token', () => {
    AccessToken.set('test')
    expect(AccessToken.get()).toEqual('test')
  })
})
