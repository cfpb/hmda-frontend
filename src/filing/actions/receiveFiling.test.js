jest.unmock('./receiveFiling.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveFiling from './receiveFiling.js'

describe('receiveFiling', () => {
  it('creates an action to signal a new filing has been acquired', () => {
    const data = {
      filing: { a: 1 }
    }

    expect(receiveFiling(data)).toEqual({
      type: types.RECEIVE_FILING,
      filing: data
    })
  })
})
