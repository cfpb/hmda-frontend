jest.unmock('./receiveUploadError.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveUploadError from './receiveUploadError.js'

const dispatch = jest.fn()
const getState = jest.fn(() => {
  return {
    app: {
      lei: '123'
    }
  }
})

describe('receiveUploadError', () => {
  it('creates an action to signal receiving an error', () => {
    receiveUploadError('b')(dispatch, getState)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.RECEIVE_UPLOAD_ERROR,
      error: 'b',
      lei: '123'
    })
  })

  it('creates an action to signal receiving an error when no error is passed', () => {
    receiveUploadError()(dispatch, getState)
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: types.RECEIVE_UPLOAD_ERROR,
      error: new Error('Unexpected upload error'),
      lei: '123'
    })
  })
})
