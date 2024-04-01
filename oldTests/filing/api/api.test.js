jest.unmock('./api')
import * as api from '../../../src/filing/api/api'

const fetch = require.requireActual('./fetch')
const mockedFetch = jest.fn()
fetch.fetch = mockedFetch

describe('api', () => {
  it('gets institution', () => {
    api.getInstitution('lei', 'filingYear')
    expect(mockedFetch.mock.calls[0][0]).toEqual({
      pathname: '/institutions/lei/year/filingYear',
    })
  })

  it('gets quarterly institution', () => {
    api.getInstitution('lei', 'filingYear-fq')
    expect(mockedFetch.mock.calls[1][0]).toEqual({
      pathname: '/institutions/lei/year/filingYear/quarter/FQ',
    })
  })

  it('posts upload', () => {
    api.postUpload({})
    expect(mockedFetch.mock.calls[2][0]).toEqual({
      method: 'POST',
      body: {},
    })
  })

  it('creates institutions', () => {
    api.createSubmission('1', '2')
    expect(mockedFetch.mock.calls[3][0]).toEqual({
      pathname: '/institutions/1/filings/2/submissions',
      method: 'POST',
    })
  })

  it('gets filing', () => {
    api.getFiling('1', '2')
    expect(mockedFetch.mock.calls[4][0]).toEqual({
      pathname: '/institutions/1/filings/2',
    })
  })

  it('gets latest submission', () => {
    api.getLatestSubmission()
    expect(mockedFetch.mock.calls[5][0]).toEqual({
      submission: 'latest',
      noCache: 1,
    })
  })

  it('gets edits', () => {
    api.getEdits({})
    expect(mockedFetch.mock.calls[6][0]).toEqual({ suffix: '/edits' })
  })

  it('gets edit', () => {
    api.getEdit({ edit: '1' })
    expect(mockedFetch.mock.calls[7][0]).toEqual({
      suffix: '/edits/1',
    })
  })

  it('gets csv', () => {
    api.getCSV({})
    expect(mockedFetch.mock.calls[8][0]).toEqual({
      params: { format: 'csv' },
      suffix: '/edits/csv',
    })

    api.getCSV({ suffix: '1' })
    expect(mockedFetch.mock.calls[9][0]).toEqual({
      params: { format: 'csv' },
      suffix: '1',
    })
  })

  it('posts verify', () => {
    api.postVerify('2', '3')
    expect(mockedFetch.mock.calls[10][0]).toEqual({
      suffix: '/edits/2',
      method: 'POST',
      body: { verified: '3' },
    })
  })

  it('gets summary', () => {
    api.getSummary()
    expect(mockedFetch.mock.calls[11][0]).toEqual({
      suffix: '/summary',
    })
  })

  it('gets signature', () => {
    api.getSignature()
    expect(mockedFetch.mock.calls[12][0]).toEqual({
      suffix: '/sign',
    })
  })

  it('gets parse errors', () => {
    api.getParseErrors()
    expect(mockedFetch.mock.calls[13][0]).toEqual({
      suffix: '/parseErrors',
    })
  })

  it('posts signature', () => {
    api.postSignature('2')
    expect(mockedFetch.mock.calls[14][0]).toEqual({
      suffix: '/sign',
      method: 'POST',
      body: { signed: '2' },
    })
  })

  it('creates filing', () => {
    api.createFiling('1', '2')
    expect(mockedFetch.mock.calls[15][0]).toEqual({
      pathname: '/institutions/1/filings/2',
      method: 'POST',
    })
  })
})
