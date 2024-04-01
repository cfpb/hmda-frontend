import makeUrl from '../../../src/filing/api/makeUrl'

describe('make url from location object', () => {
  const baseUrl = '/v2/filing'

  it('should make a plain url from environment variable', () => {
    expect(makeUrl({})).toEqual(baseUrl)
  })

  it('should respect full pathnames', () => {
    expect(makeUrl({ pathname: '/argle' })).toEqual(`${baseUrl}/argle`)
  })

  it('should make url from obj', () => {
    expect(
      makeUrl({
        lei: 'lei',
        filing: 'filing',
        submission: 'submission',
        suffix: '/suffix',
        querystring: '?qs',
      }),
    ).toEqual(
      `${baseUrl}/institutions/lei/filings/filing/submissions/submission/suffix?qs`,
    )
  })

  it('should make url from obj for quarterly filing', () => {
    expect(
      makeUrl({
        lei: 'lei',
        filing: 'filing-quarterly',
        submission: 'submission',
        suffix: '/suffix',
        querystring: '?qs',
      }),
    ).toEqual(
      `${baseUrl}/institutions/lei/filings/filing/quarter/QUARTERLY/submissions/submission/suffix?qs`,
    )
  })
})
