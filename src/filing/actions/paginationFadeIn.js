import * as types from '../constants'

export default function paginationFadeIn(target) {
  return {
    type: types.PAGINATION_FADE_IN,
    target: target
  }
}
