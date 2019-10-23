jest.unmock('./receiveSummary.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveSummary from './receiveSummary.js'
import fs from 'fs'

describe('receiveSummary', () => {
  it('creates an action to signal the summary data has been acquired', () => {
    expect(receiveSummary({ respondent: 'argle', file: 'bargle' })).toEqual({
      type: types.RECEIVE_SUMMARY,
      respondent: 'argle',
      file: 'bargle'
    })
  })
})
