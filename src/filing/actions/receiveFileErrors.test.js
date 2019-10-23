jest.unmock('./receiveFileErrors.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveFileErrors from './receiveFileErrors.js'

describe('receiveFileErrors', () => {
  it('creates a receiveFileErrors action', () => {
    expect(receiveFileErrors('123', ['oi'], 'afile')).toEqual({
      type: types.RECEIVE_FILE_ERRORS,
      errors: ['oi'],
      lei: '123',
      file: 'afile'
    })
  })
})
