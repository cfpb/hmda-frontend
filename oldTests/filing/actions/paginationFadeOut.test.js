jest.unmock('./paginationFadeOut.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import paginationFadeOut from '../../../src/filing/actions/paginationFadeOut.js'

describe('paginationFadeOut', () => {
  it('creates an action to signal that a pagination component should fade out', () => {
    expect(paginationFadeOut()).toEqual({
      type: types.PAGINATION_FADE_OUT,
    })
  })
})
