jest.unmock('./log.js')

import log, { error } from './log.js'

const mockedLog = jest.fn()
console.log = mockedLog

const mockedError = jest.fn()
console.error = mockedError

process.env.NODE_ENV = 'dev'

describe('log', () => {
  it('logs data out of production', () => {
    log('data')
    expect(mockedLog.mock.calls.length).toBe(1)
  })

  it('logs no data in production', () => {
    process.env.NODE_ENV = 'production'
    log('data')
    expect(mockedLog.mock.calls.length).toBe(1)
    process.env.NODE_ENV = 'dev'
  })

  it('logs errors out of production', () => {
    error('data')
    expect(mockedError.mock.calls.length).toBe(1)
  })

  it('logs errors in production', () => {
    process.env.NODE_ENV = 'production'
    error('data')
    expect(mockedError.mock.calls.length).toBe(2)
    process.env.NODE_ENV = 'dev'
  })
})
