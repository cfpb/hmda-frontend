jest.unmock('./log.js')

import log, { error } from '../../../src/filing/utils/log.js'

const mockedLog = jest.fn()
console.log = mockedLog

const mockedError = jest.fn()
console.error = mockedError

import.meta.env.NODE_ENV = 'dev'

describe('log', () => {
  it('logs data out of production', () => {
    log('data')
    expect(mockedLog.mock.calls.length).toBe(1)
  })

  it('logs no data in production', () => {
    import.meta.env.NODE_ENV = 'production'
    log('data')
    expect(mockedLog.mock.calls.length).toBe(1)
    import.meta.env.NODE_ENV = 'dev'
  })

  it('logs errors out of production', () => {
    error('data')
    expect(mockedError.mock.calls.length).toBe(1)
  })

  it('logs errors in production', () => {
    import.meta.env.NODE_ENV = 'production'
    error('data')
    expect(mockedError.mock.calls.length).toBe(2)
    import.meta.env.NODE_ENV = 'dev'
  })
})
