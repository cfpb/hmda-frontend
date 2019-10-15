jest.unmock('./paginationFadeIn.js')
jest.unmock('../constants')
import * as types from '../constants'
import paginationFadeIn from './paginationFadeIn.js'

describe('paginationFadeIn', () => {
  it('creates an action to signal that a pagination component should fade in', () => {
    expect(paginationFadeIn()).toEqual({
      type: types.PAGINATION_FADE_IN
    })
  })
})
