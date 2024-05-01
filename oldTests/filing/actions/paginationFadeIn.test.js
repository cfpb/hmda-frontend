jest.unmock('./paginationFadeIn.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import paginationFadeIn from '../../../src/filing/actions/paginationFadeIn.js'

describe('paginationFadeIn', () => {
  it('creates an action to signal that a pagination component should fade in', () => {
    expect(paginationFadeIn()).toEqual({
      type: types.PAGINATION_FADE_IN,
    })
  })
})
