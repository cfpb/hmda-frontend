import createQueryString from '../../../src/filing/api/createQueryString'

describe('create query string', () => {
  it('makes a query string from params', () => {
    expect(createQueryString({ a: 1, b: 2 })).toEqual('?a=1&b=2')
    expect(createQueryString({})).toEqual('?')
  })
})
