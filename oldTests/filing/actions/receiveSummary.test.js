jest.unmock('./receiveSummary.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import receiveSummary from '../../../src/filing/actions/receiveSummary.js'
import fs from 'fs'

describe('receiveSummary', () => {
  it('creates an action to signal the summary data has been acquired', () => {
    expect(receiveSummary({ respondent: 'argle', file: 'bargle' })).toEqual({
      type: types.RECEIVE_SUMMARY,
      respondent: 'argle',
      file: 'bargle',
    })
  })
})
