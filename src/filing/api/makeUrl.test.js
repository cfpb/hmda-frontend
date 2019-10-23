import makeUrl from './makeUrl'

describe('make url from location object', () => {
  beforeEach(() => {
    window.HMDA_ENV = { HMDA_API: 'servername' }
  })
  it('throws without HMDA_ENV', done => {
    window.HMDA_ENV = null
    try {
      makeUrl()
    } catch (e) {
      expect(e.message).toEqual(
        'No url provided for API, unable to fetch data. This is most likely a build issue.'
      )
      done()
    }
  })

  it('throws without a HMDA_API in HMDA_ENV', done => {
    window.HMDA_ENV = { HMDA_API: null }
    try {
      makeUrl()
    } catch (e) {
      expect(e.message).toEqual(
        'No url provided for API, unable to fetch data. This is most likely a build issue.'
      )
      done()
    }
  })

  it('should make a plain url from environment variable', () => {
    expect(makeUrl({})).toEqual('servername')
  })

  it('should respect full pathnames', () => {
    expect(makeUrl({ pathname: '/argle' })).toEqual('servername/argle')
  })

  it('should make url from obj', () => {
    expect(
      makeUrl({
        lei: 'lei',
        filing: 'filing',
        submission: 'submission',
        suffix: '/suffix',
        querystring: '?qs'
      })
    ).toEqual(
      'servername/institutions/id/filings/filing/submissions/submission/suffix?qs'
    )
  })
})
