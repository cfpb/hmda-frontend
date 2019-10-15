jest.unmock('./error.js')
import * as types from '../constants'
import excludeTypes from './excludeTypes.js'
import error from './error.js'

const defaultError = null

describe('error reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(error(undefined, {})).toEqual(defaultError)
  })

  it('should update the error state when error encountered', () => {
    expect(
      error(defaultError, { type: types.RECEIVE_ERROR, error: 'an error' })
    ).toEqual('an error')
  })

  it('should update the error state when upload error encountered', () => {
    expect(
      error(defaultError, {
        type: types.RECEIVE_UPLOAD_ERROR,
        error: 'an error'
      })
    ).toEqual('an error')
  })

  it('should refresh error state', () => {
    expect(error({}, { type: types.REFRESH_STATE })).toEqual(defaultError)
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.REFRESH_STATE,
      types.RECEIVE_ERROR,
      types.RECEIVE_UPLOAD_ERROR
    ).forEach(v => expect(error({}, v)).toEqual({}))
  })
})
