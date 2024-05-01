jest.unmock('./showConfirm.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import showConfirm from '../../../src/filing/actions/showConfirm.js'

describe('showConfirm', () => {
  it('creates an action to signal display of the refile confirmation modal', () => {
    expect(showConfirm()).toEqual({
      type: types.SHOW_CONFIRM,
      showing: true,
    })
  })
})
