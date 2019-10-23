jest.unmock('./paginationFadeOut.js')
jest.unmock('../constants')
import * as types from '../constants'
import paginationFadeOut from './paginationFadeOut.js'

describe('paginationFadeOut', () => {
  it('creates an action to signal that a pagination component should fade out', () => {
    expect(paginationFadeOut()).toEqual({
      type: types.PAGINATION_FADE_OUT
    })
  })
})
