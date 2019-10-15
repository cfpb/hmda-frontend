jest.unmock('./isRedirecting.js')
jest.unmock('../constants')
import * as types from '../constants'
import isRedirecting from './isRedirecting.js'

describe('isRedirecting', () => {
  it('creates an action to signal redirecting status', () => {
    expect(isRedirecting(true)).toEqual({
      type: types.REDIRECTING,
      redirecting: true
    })
  })
})
